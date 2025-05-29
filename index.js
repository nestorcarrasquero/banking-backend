import express from 'express'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { MoneyRepository } from './money-repository.js'
import { CryptoRepository } from './crypto-repository.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch {}
  next()
})

app.get('/', (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Acceso denegado')
  res.send({ user })
})

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      }
    )
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .send({ user, token })
  } catch (error) {
    res.status(401).send(error.message)
  }
})

app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id, message: 'Usuario creado satisfactoriamente' })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post('/auth/logout', (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'Logout exitoso' })
})

app.get('/moneda', async (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Acceso denegado')
  try {
    const list = await MoneyRepository.getAll()
    res.send({ list })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post('/moneda', async (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Acceso denegado')
  const { nombre, simbolo, codigoISO, pais } = req.body
  try {
    const money = await MoneyRepository.create({ nombre, simbolo, codigoISO, pais })
    res.send({ money, message: 'Moneda agregada satisfactoriamente' })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get('/criptomoneda', async (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Acceso denegado')
  let list = []
  const idMoney = req.query.moneda
  try {
    if (!idMoney) {
      list = await CryptoRepository.getAll()
    } else {
      list = await CryptoRepository.getCryptoByMoney({ idMoney })
    }
    res.send({ list })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post('/criptomoneda', async (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Acceso denegado')
  const { nombre, simbolo, descripcion, algoritmo, website, monedas } = req.body
  try {
    const crypto = await CryptoRepository.create({ nombre, simbolo, descripcion, algoritmo, website, monedas })
    res.send({ crypto, message: 'Crypto agregado satisfactoriamente' })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.put('/criptomoneda/:id', async (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Acceso denegado')
  const { nombre, simbolo, descripcion, algoritmo, website, monedas } = req.body
  const id = req.params.id
  if (!id) return res.status(403).send('No ID provisto')
  try {
    const crypto = await CryptoRepository.update({ id, nombre, simbolo, descripcion, algoritmo, website, monedas })
    res.send({ crypto, message: 'Crypto actualizado satisfactoriamente' })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
