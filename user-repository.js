import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'
import { UserSchema } from './validations.js'
import prisma from './lib/prisma.js'

export class UserRepository {
  static async create ({ username, password }) {
    const result = UserSchema.safeParse({ username, password })
    if (result.success) {
      const existingUser = await prisma.user.findUnique({
        where: {
          username
        }
      })
      if (existingUser) throw new Error('Usuario ya existe')
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword
        }
      })
      const { password: _, ...publicUser } = user
      return publicUser
    } else {
      return result.error.errors
    }
  }

  static async login ({ username, password }) {
    const result = UserSchema.safeParse({ username, password })
    if (result.success) {
      const existingUser = await prisma.user.findUnique({
        where: {
          username
        }
      })
      if (!existingUser) throw new Error('Usuario no existe')
      const isValid = await bcrypt.compareSync(password, existingUser.password)
      if (!isValid) throw new Error('Clave invalida')
      const { password: _, ...publicUser } = existingUser
      return publicUser
    } else {
      return result.error.errors
    }
  }
}
