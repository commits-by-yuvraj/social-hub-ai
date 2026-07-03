import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/**
 * Hash password using bcrypt
 * @param {string} password 
 * @returns {Promise<string>}
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * Compare plain password with hash
 * @param {string} password 
 * @param {string} hashedPassword 
 * @returns {Promise<boolean>}
 */
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}

/**
 * Generate JWT access token
 * @param {object} user 
 * @returns {string}
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  )
}

/**
 * Generate JWT refresh token
 * @param {object} user 
 * @returns {string}
 */
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET || 'super-secret-refresh-secret',
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  )
}

/**
 * Standardize successful API response structure
 * @param {object} res 
 * @param {number} statusCode 
 * @param {string} message 
 * @param {object} data 
 */
export const sendSuccess = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  })
}

/**
 * Send authentication tokens and response body
 * @param {object} res 
 * @param {object} user 
 * @param {number} statusCode 
 * @param {string} message 
 */
export const sendTokenResponse = (res, user, statusCode, message) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  // Configure cookie settings
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 // default 7 days match JWT_REFRESH_EXPIRES_IN
    ),
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }

  // Remove password from returned user object
  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }

  return res
    .status(statusCode)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json({
      success: true,
      message,
      data: {
        user: userResponse,
        accessToken,
      },
    })
}
