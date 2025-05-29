import prisma from './lib/prisma.js'
import { MoneySchema } from './validations.js'

export class MoneyRepository {
  static async getAll () {
    const allMoney = await prisma.moneda.findMany()
    return allMoney
  }

  static async create ({ nombre, simbolo, codigoISO, pais }) {
    const result = MoneySchema.safeParse({ nombre, simbolo, codigoISO, pais })
    if (result.success) {
      const money = await prisma.moneda.create({
        data: {
          nombre,
          simbolo,
          codigoISO,
          pais
        }
      })
      return money
    } else {
      return result.error.errors
    }
  }
}
