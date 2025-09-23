import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShopSphere API',
      version: '2.0.0',
      description: 'Modern eCommerce API built with Node.js, Express, and MongoDB',
      contact: {
        name: 'Durgesh Vishwakarma',
        email: 'durgesh@example.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-production-url.com/api' 
          : 'http://localhost:5000/api',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User name',
              minLength: 2,
              maxLength: 50,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            isAdmin: {
              type: 'boolean',
              description: 'Admin status',
              default: false,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Product: {
          type: 'object',
          required: ['name', 'price', 'description', 'category', 'countInStock'],
          properties: {
            _id: {
              type: 'string',
              description: 'Product ID',
            },
            name: {
              type: 'string',
              description: 'Product name',
              minLength: 2,
              maxLength: 100,
            },
            image: {
              type: 'string',
              description: 'Product image URL',
            },
            description: {
              type: 'string',
              description: 'Product description',
              minLength: 10,
              maxLength: 1000,
            },
            brand: {
              type: 'string',
              description: 'Product brand',
            },
            category: {
              type: 'string',
              description: 'Product category',
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Product price',
            },
            countInStock: {
              type: 'integer',
              minimum: 0,
              description: 'Product count in stock',
            },
            rating: {
              type: 'number',
              minimum: 0,
              maximum: 5,
              description: 'Product rating',
            },
            numReviews: {
              type: 'integer',
              minimum: 0,
              description: 'Number of reviews',
            },
            reviews: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Review',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Review: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Reviewer name',
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Review rating',
            },
            comment: {
              type: 'string',
              description: 'Review comment',
            },
            user: {
              type: 'string',
              description: 'User ID',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Order ID',
            },
            user: {
              type: 'string',
              description: 'User ID',
            },
            orderItems: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  qty: { type: 'integer', minimum: 1 },
                  image: { type: 'string' },
                  price: { type: 'number', minimum: 0 },
                  product: { type: 'string' },
                },
              },
            },
            shippingAddress: {
              type: 'object',
              properties: {
                address: { type: 'string' },
                city: { type: 'string' },
                postalCode: { type: 'string' },
                country: { type: 'string' },
              },
            },
            paymentMethod: {
              type: 'string',
              description: 'Payment method',
            },
            paymentResult: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                status: { type: 'string' },
                update_time: { type: 'string' },
                email_address: { type: 'string' },
              },
            },
            taxPrice: {
              type: 'number',
              minimum: 0,
            },
            shippingPrice: {
              type: 'number',
              minimum: 0,
            },
            totalPrice: {
              type: 'number',
              minimum: 0,
            },
            isPaid: {
              type: 'boolean',
              default: false,
            },
            paidAt: {
              type: 'string',
              format: 'date-time',
            },
            isDelivered: {
              type: 'boolean',
              default: false,
            },
            deliveredAt: {
              type: 'string',
              format: 'date-time',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
            stack: {
              type: 'string',
              description: 'Error stack trace (development only)',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./backend/routes/*.js'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };