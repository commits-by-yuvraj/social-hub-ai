import { Router } from 'express'
import * as authController from '../controllers/authController.js'
import { protect } from '../middlewares/auth.js'

const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/refresh', authController.refresh)
router.get('/me', protect, authController.getMe)

export default router
