import app from './app.js'
import prisma from './config/prisma.js'

// Handle synchronous uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.error(err.name, err.message)
  console.error(err.stack)
  process.exit(1)
})

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`🚀 SocialHub AI Backend running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
})

// Handle asynchronous unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...')
  console.error(err.name, err.message)
  server.close(() => {
    prisma.$disconnect().then(() => {
      process.exit(1)
    })
  })
})

// Handle termination signals
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    prisma.$disconnect().then(() => {
      console.log('💥 Process terminated!')
    })
  })
})
