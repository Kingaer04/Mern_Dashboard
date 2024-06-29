import mongoose from "mongoose"
import passportLocalMoongoose from 'passport-local-mongoose'

const AdminSchemma = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Download.png"
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin"
    } 
}, {timestamps: true})

AdminSchemma.plugin(passportLocalMoongoose, {
    usernameField: "email"
})

const Admin = mongoose.model('Admin', AdminSchemma)

export default Admin
