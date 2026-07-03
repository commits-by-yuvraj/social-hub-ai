import jwt from 'jsonwebtoken'
import prisma from '../config/prisma.js'
import { AppError, catchAsync } from './errors.js'

/**
 * Protect routes - Authenticates user using JWT Bearer Token
 */
export const protect = catchAsync(async (req, res, next) => {
  let token

  // 1) Check for authorization header and confirm it starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  // 2) If token is not found, return unauthorized error
  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to get access.', 401)
    )
  }

  // 3) Verify the token
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return next(new AppError('Invalid or expired token. Please log in again.', 401))
  }

  // 4) Check if user still exists
  const currentUser = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    )
  }

  // 5) Grant access to protected route by attaching user to request
  req.user = currentUser
  next()
})
