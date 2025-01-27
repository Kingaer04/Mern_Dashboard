import express from 'express'
import { adminController } from '../controllers/adminController.js'


const router = express.Router()

router.post('/sign-In', adminController.authenticate)
router.post("/sign-Up", adminController.SignUp)
router.post('/google', adminController.auth)
router.post("/update", adminController.verifyToken, adminController.update)
router.delete('/delete/:id', adminController.verifyToken, adminController.delete)
router.get('/signOut', adminController.signOut)

export default router
