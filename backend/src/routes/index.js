import { Router } from 'express'
import authRoutes from './authRoutes.js'

const apiRouter = Router()

// Mount sub-routers
apiRouter.use('/auth', authRoutes)

export default apiRouter
