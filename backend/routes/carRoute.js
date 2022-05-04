const express = require("express")
const { addCar, getAllCar, getSingleCar, updateCar, deleteCar } = require("../controller/carController")
const { isAuthenticatedUser, autorizesRoles } = require("../middleware/auth")

const router = express.Router()


router.route("/addcar").post(isAuthenticatedUser, addCar)
router.route("/get").get(getAllCar)
router.route("/single/:id").get(getSingleCar)
router.route("/update/:id").put(updateCar)
router.route("/delete/:id").delete(deleteCar)


module.exports = router