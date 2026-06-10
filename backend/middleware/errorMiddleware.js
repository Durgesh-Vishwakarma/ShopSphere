const notFound = (req, res, next) => {
   const error = new Error(`Not Found - ${req.originalUrl}`);
   res.status(404);
   next(error);
};

const errorHandler = (err, req, res, _next) => {
   let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
   let message = err.message || 'Server error';

   if (err.name === 'CastError' && err.kind === 'ObjectId') {
      message = 'Resource not found';
      statusCode = 404;
   }

   if (err.message === 'Not allowed by CORS') {
      message = 'Origin is not allowed';
      statusCode = 403;
   }

   res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
   });
};

export { notFound, errorHandler };
