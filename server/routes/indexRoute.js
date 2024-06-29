import express from 'express'
import clientRoute from './clientRoute.js'
import managementRoute from './managementRoute.js'
import sales from './salesRoute.js'
import generalRoute from './generalRoute.js'
import authRoute from './authRoute.js'

const router = express.Router()

router.use('/client', clientRoute)
router.use('/management', managementRoute)
router.use('/sales', sales)
router.use('/general', generalRoute)
router.use('/user', authRoute)

export default router
