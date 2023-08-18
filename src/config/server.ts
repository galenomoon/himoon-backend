import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import routes from '../routes'
import errorHandler from '../middlewares/errorHandler'

const server = express()

server.use(cors())
server.use(routes)
server.use(errorHandler)
server.use(express.json())

export default server