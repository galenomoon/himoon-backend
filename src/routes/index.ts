import { Router } from 'express'
import categoriesRoutes from './categories.routes'

const routes = Router()

routes.use('/categories', categoriesRoutes)

routes.get('/', (_, res) => res.status(200).json({ message: 'OK!' }))

export default routes