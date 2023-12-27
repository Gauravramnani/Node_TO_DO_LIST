import { User } from "../models/user_models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/features.js"


export const getMyDetailes = (req, res) => {

    
    res.status(200).json({
        success : true,
        user : req.user
    })

}

export const register = async (req, res) => {

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {

        return res.status(404).json({
            status: false,
            message: "user already exixst"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashPassword })

    sendCookie(user, res, "Register successFully", 201)
}

export const login = async (req, res, next) => {


    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "email id ke password khoto chhe mitra"
        })
    }

    const isMath = await bcrypt.compare(password, user.password)

    if (!isMath) {
        return res.status(404).json({
            success: false,
            message: "email ke password khoto chhe mitra"
        })
    }

    sendCookie(user, res, `welcome back ${user.name} Bro`, 200)
}


export const logout = (req,res) =>{

    res.status(200)
    .cookie("token","",{
        expires : new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    })
    .json({
        success : true,
        message : "you are logout"
    })
}









// console.log(req.body);
// const { name, email, password } = req.body;

// const user = await User.findOne({ email })

// if (user) {

//     return res.redirect("/")
// }

// await User.create({
//     name,
//     email,
//     password
// })

// res.cookie("temp", "ghad283489hdh").json({
//     "success": true,
//     "message": "users create successsfully"
// })