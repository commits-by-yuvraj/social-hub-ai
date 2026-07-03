import jwt from 'jsonwebtoken'
import * as authService from '../services/authService.js'
import { catchAsync, AppError } from '../middlewares/errors.js'
import { sendTokenResponse, sendSuccess } from '../utils/helpers.js'

/**
 * Register User
 * POST /api/v1/auth/register
 */
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body

  const user = await authService.registerUser({ name, email, password })

  sendTokenResponse(res, user, 201, 'User registered successfully') // 201 created
})

/**
 * Login User
 * POST /api/v1/auth/login
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await authService.loginUser({ email, password })

  sendTokenResponse(res, user, 200, 'Logged in successfully')
})

/**
 * Logout User / Clear Cookie
 * POST /api/v1/auth/logout
 */
export const logout = catchAsync(async (req, res, next) => {
  res.cookie('refreshToken', 'loggedout', {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000), // expires in 10s
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  })

  sendSuccess(res, 200, 'Logged out successfully')
})

/**
 * Get Current Logged In User
 * GET /api/v1/auth/me
 */
export const getMe = catchAsync(async (req, res, next) => {
  // User is already fetched and attached to req.user by "protect" middleware
  sendSuccess(res, 200, 'User profile fetched successfully', { user: req.user })
})

/**
 * Refresh Access Token using Refresh Token Cookie
 * POST /api/v1/auth/refresh
 */
export const refresh = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return next(new AppError('No refresh token provided', 401))
  }

  // Verify refresh token
  let decoded
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'super-secret-refresh-secret')
  } catch (err) {
    return next(new AppError('Invalid or expired refresh token. Please login again.', 401))
  }

  // Get user info
  const user = await authService.getUserById(decoded.id)
  if (!user) {
    return next(new AppError('The user belonging to this token no longer exists.', 401))
  }

  // Send new token response (rolling refresh tokens)
  sendTokenResponse(res, user, 200, 'Token refreshed successfully')
})
