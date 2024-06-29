import mongoose from "mongoose"
import passportLocalMoongoose from 'passport-local-mongoose'

const userSchemma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin"
    } 
}, {timestamps: true})

userSchemma.plugin(passportLocalMoongoose, {
    usernameField: "email"
})

const User = mongoose.model('User', userSchemma)

export default User
