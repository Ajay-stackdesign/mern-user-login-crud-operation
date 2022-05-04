const catchasyncError = require("./catchasyncError")
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

exports.isAuthenticatedUser = catchasyncError(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(500).json("PLease Login to Access this resources")
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id)
})

// exports.autorizesRoles = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(500).json({
//                 message: `Role: ${req.user.role} is not allowed to access this resource`
//             })
//         }
//         next();
//     }
// }