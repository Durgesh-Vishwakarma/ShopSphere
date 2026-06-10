import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { generalLimiter, apiLimiter } from './middleware/rateLimitMiddleware.js';
import { httpLogger } from './utils/logger.js';
import { specs, swaggerUi } from './config/swagger.js';
import logger from './utils/logger.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Load environment variables
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET env var not set');
}

if (process.env.NODE_ENV === 'production' && !process.env.FRONTEND_URL) {
  throw new Error('FRONTEND_URL env var not set');
}

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for accurate IP addresses (important for rate limiting)
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.paypal.com"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// Compression middleware
app.use(compression());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp({
  whitelist: ['sort', 'fields', 'page', 'limit', 'category']
}));

// Rate limiting
app.use('/api/', apiLimiter);
app.use(generalLimiter);

const getAllowedOrigins = () => {
  const envOrigins = [process.env.FRONTEND_URL, process.env.SERVER_URL]
    .filter(Boolean)
    .flatMap((value) => value.split(','))
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

  if (process.env.NODE_ENV === 'production') {
    return envOrigins;
  }

  return [
    ...envOrigins,
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
  ];
};

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');
    const allowedOrigins = getAllowedOrigins();

    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }

    logger.warn('CORS blocked origin', { origin });
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'X-File-Name'
  ],
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Handle preflight OPTIONS requests explicitly
app.options('*', cors(corsOptions));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(httpLogger);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'ShopSphere API Documentation'
  }));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '2.0.0'
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// PayPal configuration endpoint
app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Serve uploaded files statically
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const frontendDistPath = path.join(__dirname, '/frontend/dist');
const frontendIndexPath = path.resolve(__dirname, 'frontend', 'dist', 'index.html');

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(frontendDistPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache');
        return;
      }

      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    },
  }));
} else {
  app.get('/', (req, res) => {
    res.json({
      message: '🚀 ShopSphere API is running!',
      version: '2.0.0',
      documentation: '/api-docs',
      health: '/health'
    });
  });
}

// SPA fallback for deep links
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path === '/health' || req.path.startsWith('/uploads')) {
    return next();
  }

  if (process.env.NODE_ENV !== 'production') {
    return res.redirect(`http://localhost:5173${req.originalUrl}`);
  }

  return res.sendFile(frontendIndexPath);
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start Server
app.listen(PORT, () => {
  logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  if (process.env.NODE_ENV === 'development') {
    logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    logger.info(`🏥 Health Check: http://localhost:${PORT}/health`);
  }
});
