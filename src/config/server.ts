import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from '../routes'
import { errorHandler } from '../middlewares/errorHandler'

const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)
server.use(errorHandler)

export default server