import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import session from "express-session" // for cookie session
import cookieParser from "cookie-parser"
import passport from 'passport'
import cors from 'cors'
import helmet from 'helmet' // for secusrity on cross origin
import morgan from 'morgan' // for API calls
import router from './routes/indexRoute.js'
import Admin from './models/admin.js'
import User from './models/user.js'
import Product from './models/product.js'
import ProductStat from './models/productStat.js'
import { dataUser, dataProduct, dataProductStat, dataTransaction } from "./data/index.js"
import Transaction from './models/transaction.js'


dotenv.config()

const app = express()

app.use(cookieParser("secret_passcode"))
app.use(session({
    secret: "secret_passcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  // Ensure the cookie is httpOnly for security
        secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
        maxAge: 3600000  // 1 hour
    }
}));
app.use(passport.initialize())
app.use(passport.session()) // Passport to use session that has been setup
passport.use(Admin.createStrategy()) // configure the user's login strategy
passport.serializeUser(Admin.serializeUser()) // for encrypting
passport.deserializeUser(Admin.deserializeUser()) //for decrypting

app.use(helmet.crossOriginResourcePolicy({'policy': "cross-origin"}))
app.use(morgan("common"))

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

const db = mongoose.connection
mongoose.connect(process.env.MONGO)

db.once("open", () => {
    console.log("Database connected successfully!")
})

// User.insertMany(dataUser)
// Product.insertMany(dataProduct)
// ProductStat.insertMany(dataProductStat)
// Transaction.insertMany(dataTransaction)

app.use('/', router)

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log(`Server is running on https://localhost/${app.get('port')}`)
}) 
