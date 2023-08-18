import { Router } from 'express'
import categoriesRoutes from './categories.routes'
import productsRoutes from './products.routes'

const routes = Router()

routes.use('/products', productsRoutes)
routes.use('/categories', categoriesRoutes)

routes.get('/', (_, res) => res.status(200).json({ message: 'OK!' }))

export default routes