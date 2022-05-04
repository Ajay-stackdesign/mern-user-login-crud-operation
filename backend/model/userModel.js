const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter the EMail"],
        validate: [validator.isEmail, "Please Enter the Valid email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter the Password"],
        minlength: [8, "Password should ne more than 8 characters"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// Compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


module.exports = new mongoose.model("User", userSchema)