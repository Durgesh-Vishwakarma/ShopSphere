# Deployment Guide

## 🚀 Deployment Overview

ShopSphere is deployed using a modern, scalable architecture:
- **Frontend**: Vercel (Optimized for React/Vite applications)
- **Backend**: Render (Node.js hosting with auto-scaling)
- **Database**: MongoDB Atlas (Cloud database)
- **CDN**: Cloudinary (Image storage and optimization)

---

## 🌐 Live Application URLs

### Production Environment
- **Frontend**: [https://shop-sphere-kohl.vercel.app](https://shop-sphere-kohl.vercel.app)
- **Backend API**: [https://your-backend-on-render.com](https://your-backend-on-render.com)
- **API Documentation**: [https://your-backend-on-render.com/api-docs](https://your-backend-on-render.com/api-docs)

### Development Environment
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

---

## 📦 Vercel Deployment (Frontend)

### Automatic Deployment
Vercel is connected to your GitHub repository for automatic deployments:
- **Main Branch**: Auto-deploys to production
- **Feature Branches**: Create preview deployments
- **PR Reviews**: Deploy previews for pull requests

### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

### Environment Variables (Vercel)
Set these in your Vercel dashboard:
```env
VITE_API_URL=https://your-backend-on-render.com
```

### Build Configuration
```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm install && cd frontend && npm install",
  "framework": "vite"
}
```

---

## 🖥️ Render Deployment (Backend)

### Service Configuration
- **Service Type**: Web Service
- **Environment**: Node.js
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Auto-Deploy**: Enabled from main branch

### Environment Variables (Render)
Set these in your Render dashboard:
```env
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secure_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
PAGINATION_LIMIT=12
```

### Health Check Configuration
```json
{
  "healthCheckPath": "/health",
  "port": 5000
}
```

---

## 🗄️ Database Setup (MongoDB Atlas)

### Cluster Configuration
1. **Create MongoDB Atlas account**
2. **Create new cluster** (Free tier available)
3. **Configure network access** (Add Render's IP ranges)
4. **Create database user** with read/write permissions
5. **Get connection string** and add to environment variables

### Security Settings
- **Network Access**: Configure IP whitelist
- **Database Access**: Create dedicated user for application
- **Backup**: Enable automatic backups
- **Monitoring**: Set up alerts for performance issues

---

## 🖼️ Cloudinary Setup (Image Storage)

### Account Configuration
1. **Create Cloudinary account**
2. **Get API credentials** from dashboard
3. **Configure upload presets** for different image types
4. **Set up transformation presets** for optimized delivery

### Upload Configuration
```javascript
// Cloudinary settings in backend
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});
```

---

## 🔧 Build Optimizations

### Frontend Build Settings
```javascript
// vite.config.js optimizations
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['react-redux', '@reduxjs/toolkit'],
          router: ['react-router-dom'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
  },
});
```

### Backend Optimizations
- **Compression**: gzip compression enabled
- **Caching**: Proper cache headers for static assets
- **Clustering**: Multi-process support for better performance
- **Monitoring**: Health checks and error logging

---

## 🚨 Troubleshooting

### Common Deployment Issues

#### Vercel Issues
```bash
# Build fails
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check for environment variable typos

# 404 on routes
- Ensure vercel.json has proper rewrite rules
- Check that all routes are defined in React Router
```

#### Render Issues
```bash
# Service won't start
- Check start command in package.json
- Verify environment variables are set
- Check logs for specific error messages

# Database connection fails
- Verify MongoDB Atlas connection string
- Check network access settings
- Confirm database user permissions
```

### Performance Monitoring
```bash
# Check application health
curl https://your-backend-on-render.com/health

# Monitor API response times
curl -w "@curl-format.txt" -o /dev/null -s https://your-backend-on-render.com/api/products

# Check frontend performance
# Use Lighthouse in Chrome DevTools
```

---

## 📊 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] Database seeded with sample data
- [ ] Images uploaded to Cloudinary
- [ ] API endpoints tested
- [ ] Frontend build successful
- [ ] Security headers configured

### Post-Deployment
- [ ] Health check endpoint responding
- [ ] Frontend routes working correctly
- [ ] API endpoints accessible
- [ ] Database connections stable
- [ ] Image uploads functioning
- [ ] Authentication flow working
- [ ] Admin dashboard accessible
- [ ] Performance metrics acceptable

---

## 🔍 Monitoring & Maintenance

### Application Monitoring
- **Render**: Built-in metrics and logs
- **Vercel**: Analytics and performance insights
- **MongoDB Atlas**: Database performance monitoring
- **Cloudinary**: Usage and transformation metrics

### Regular Maintenance
- **Security Updates**: Keep dependencies updated
- **Performance Review**: Monthly performance audits
- **Database Optimization**: Query performance analysis
- **User Feedback**: Monitor user experience metrics

---

## 📈 Scaling Considerations

### Horizontal Scaling
- **Load Balancers**: Distribute traffic across multiple instances
- **CDN Integration**: Global content delivery
- **Microservices**: Break down monolith for better scaling
- **Caching Layer**: Redis for session and API caching

### Performance Optimization
- **Database Indexing**: Optimize query performance
- **Image Optimization**: Automatic compression and format selection
- **Bundle Splitting**: Reduce initial load times
- **API Rate Limiting**: Prevent abuse and ensure stability

---

*This deployment guide ensures your ShopSphere application runs smoothly in production while demonstrating professional DevOps practices to potential employers.*