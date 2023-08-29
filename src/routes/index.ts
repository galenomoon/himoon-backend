import { Router } from 'express'
import authRoutes from './auth.routes'
import productsRoutes from './products.routes'
import categoriesRoutes from './categories.routes'
import { authenticateToken } from '../middlewares/authMiddleware'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/products', authenticateToken, productsRoutes)
routes.use('/categories', authenticateToken, categoriesRoutes)

routes.get('/', (_, res) => res.status(200).json({ message: 'OK!' }))

export default routes