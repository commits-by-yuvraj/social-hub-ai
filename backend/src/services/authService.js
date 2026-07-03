import prisma from '../config/prisma.js'
import { hashPassword, comparePassword } from '../utils/helpers.js'
import { AppError } from '../middlewares/errors.js'

/**
 * Register a new user
 * @param {object} userData - { name, email, password }
 * @returns {Promise<object>} Created user
 */
export const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new AppError('Please provide name, email, and password', 400)
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new AppError('Email address already in use', 400)
  }

  // Hash password
  const hashedPassword = await hashPassword(password)

  // Create user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return newUser
}

/**
 * Authenticate user with email and password
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} Authenticated user
 */
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400)
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new AppError('Invalid email or password', 401)
  }

  // Compare passwords
  const isMatch = await comparePassword(password, user.password)
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401)
  }

  return user
}

/**
 * Get user profile by ID
 * @param {string} userId 
 * @returns {Promise<object>} User
 */
export const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return user
}
