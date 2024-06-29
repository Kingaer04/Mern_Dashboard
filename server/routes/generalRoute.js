import express from 'express'
import { adminController } from '../controllers/adminController.js'


const router = express.Router()

router.get("/user/:id", adminController.getUser)

export default router
