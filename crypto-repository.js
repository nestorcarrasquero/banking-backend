import prisma from './lib/prisma.js'
import { CryptoSchema } from './validations.js'

export class CryptoRepository {
  static async getAll () {
    const allCryptos = await prisma.criptomoneda.findMany({
      include: {
        monedas: true
      }
    })
    return allCryptos
  }

  static async create ({ nombre, simbolo, descripcion, algoritmo, website, monedas }) {
    const result = CryptoSchema.safeParse({ nombre, simbolo, descripcion, algoritmo, website, monedas })
    if (result.success) {
      const crypto = await prisma.criptomoneda.create({
        data: {
          nombre,
          simbolo,
          descripcion,
          algoritmo,
          website,
          monedas: {
            connect: monedas.map(m => ({ id: m.id }))
          }
        },
        include: {
          monedas: true
        }
      })
      return crypto
    } else {
      return result.error.errors
    }
  }

  static async getCryptoByMoney ({ idMoney }) {
    const allCryptos = await prisma.criptomoneda.findMany({
      where: {
        monedas: {
          some: {
            id: idMoney
          }
        }
      }
    })
    return allCryptos
  }

  static async update ({ id, nombre, simbolo, descripcion, algoritmo, website, monedas }) {
    const result = CryptoSchema.safeParse({ nombre, simbolo, descripcion, algoritmo, website, monedas })
    if (result.success) {
      const crypto = await prisma.criptomoneda.update({
        where: {
          id
        },
        data: {
          nombre,
          simbolo,
          descripcion,
          algoritmo,
          website,
          monedas: {
            set: monedas.map(m => ({ id: m.id }))
          }
        },
        include: {
          monedas: true
        }
      })
      return crypto
    } else {
      return result.error.errors
    }
  }
}
