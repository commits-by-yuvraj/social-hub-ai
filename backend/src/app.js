import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import apiRouter from './routes/index.js'
import { globalErrorHandler, notFoundHandler } from './middlewares/errors.js'

// Load environment variables
dotenv.config()

const app = express()

// 1) GLOBAL MIDDLEWARES
// Enable CORS with dynamic/allowed origin support and cookies credential exchange
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  })
)

// Body parsers
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Cookie parser
app.use(cookieParser())

// 2) API ROUTES
app.use('/api/v1', apiRouter)

// Liveness probe/health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'SocialHub AI Backend is healthy',
    timestamp: new Date().toISOString(),
  })
})

// 3) ERROR HANDLERS
// Handle unhandled routes (404)
app.use(notFoundHandler)

// Central global error handler
app.use(globalErrorHandler)

export default app
