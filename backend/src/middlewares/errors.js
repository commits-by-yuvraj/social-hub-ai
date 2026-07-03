/**
 * Custom Operational Error Class
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Reusable async function wrapper to catch unhandled Promise rejections
 * @param {Function} fn - Async express route handler/middleware
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

/**
 * Global Express Error Handler Middleware
 */
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  const response = {
    success: false,
    status: err.status,
    message: err.message || 'Something went wrong',
  }

  // Include stack trace only in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack
    response.error = err
  }

  // Handle unique constraints or other Prisma-specific errors gracefully
  if (err.code === 'P2002') {
    err.statusCode = 400
    response.message = 'Email address already in use'
    response.status = 'fail'
  }

  // Handle Invalid JWT
  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401
    response.message = 'Invalid token. Please log in again.'
    response.status = 'fail'
  }

  // Handle Expired JWT
  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401
    response.message = 'Token has expired. Please log in again.'
    response.status = 'fail'
  }

  res.status(err.statusCode).json(response)
}

/**
 * Handle 404 Route Not Found Middleware
 */
export const notFoundHandler = (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found on this server`, 404))
}
