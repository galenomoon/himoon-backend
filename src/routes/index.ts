import { Router } from 'express'
import authRoutes from './auth.routes'
import productsRoutes from './products.routes'
import categoriesRoutes from './categories.routes'
import imagesRoutes from './images.routes'
const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/products', productsRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/images', imagesRoutes)

routes.get('/', (_, res) => res.status(200).json({ message: 'OK!' }))

export default routes