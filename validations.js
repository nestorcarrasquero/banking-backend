import { z } from 'zod'

export const UserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6)
})

export const MoneySchema = z.object({
  nombre: z.string(),
  simbolo: z.string(),
  codigoISO: z.string(),
  pais: z.string()
})

export const CryptoSchema = z.object({
  nombre: z.string(),
  simbolo: z.string(),
  descripcion: z.string().optional(),
  algoritmo: z.string().optional(),
  website: z.string().url().optional(),
  monedas: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Debe seleccionar al menos una moneda'
  })
})
