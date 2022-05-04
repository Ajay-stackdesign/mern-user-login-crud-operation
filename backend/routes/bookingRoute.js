const express = require("express")
const { bookCar, getAllBooking } = require("../controller/bookingController")
const { isAuthenticatedUser, autorizesRoles } = require("../middleware/auth")
const router = express.Router()


router.route("/bookings/bookcar").post(isAuthenticatedUser, bookCar)
router.route("/getallbooking").get(isAuthenticatedUser, getAllBooking)


module.exports = router