const Booking = require("../model/bookingModel")
const Car = require("../model/carModel")
const stripe = require("stripe")(
    "sk_test_51KEqWUSA8DUXqy38SawMfc4b2hmzrYFGskX7FCRYrpBg1xCY5IU2O3BkRHW2NYJBWnxYn01l2IGyoHBpHOjhi9kz00OUYc1P5l"
)
const { v4: uuidv4 } = require("uuid")

exports.bookCar = async (req, res, next) => {
    const { token } = req.body
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        })

        const payment = await stripe.charges.create({
            amount: req.body.totalAmount * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email
        },
            {
                idempotencykey: uuidv4(),
            }
        )

        if (payment) {
            req.body.transactionId = payment.source.id;
            const newBooking = new Booking(req.body)
            await newBooking.save()

            const car = await Car.findOne({ _id: req.body.car })

            car.bookedTimeSlots.push(req.body.bookedTimeSlots)

            await car.save()
            res.status(200).json("Your Booking is SuccessFull")
        } else {
            return res.status(500).json(error)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.getAllBooking = async (req, res, next) => {
    try {
        const bookings = await Booking.find().populate("car")

        res.status(200).json({
            success: true,
            bookings
        })
    } catch (err) {
        res.status(500).json(err)
    }
}
