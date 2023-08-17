import 'express-async-errors'
import express from 'express'
import cors from 'cors'

// import routes

const server = express()

server.use(cors())
server.use(express.json())

export default server