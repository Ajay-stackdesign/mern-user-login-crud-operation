const express = require("express")
const { register, login, logoutUser } = require("../controller/userContoller")

const router = express.Router()


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logoutUser)


module.exports = router