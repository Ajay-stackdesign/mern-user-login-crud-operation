const sendToken = require("../utils/jwtToken")
const User = require("../model/userModel")


exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const user = await User.create({
            name,
            email,
            password
        })
        console.log(user)

        sendToken(user, 201, res);

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(500).json("Invalid Email or Password")
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(500).json("Invalid Email or password")
        }

        const isPassword = await user.comparePassword(password)

        if (!isPassword) {
            return res.status(500).json("Invalid Email or Password")
        }

        sendToken(user, 201, res);
        // res.status(200).json({
        //     success: true,
        //     user
        // })

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.logoutUser = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: "You are Logged In"
        })
    } catch (err) {
        res.status(200).json(err)
    }
}