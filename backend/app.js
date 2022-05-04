const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(fileUpload())

const carRoute = require("./routes/carRoute")
const userRoute = require("./routes/userRouter")
const bookingRoute = require("./routes/bookingRoute")

app.use("/api/v1", carRoute)
app.use("/api/v1", userRoute)
app.use("/api/v1", bookingRoute)

module.exports = app