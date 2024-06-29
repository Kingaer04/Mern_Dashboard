import express from 'express'
import {client} from '../controllers/client.js'


const router = express.Router()

router.get("/products", client.getProducts)
router.get("/customers", client.getCustomers)
router.get("/transaction", client.getTransaction)

export default router
