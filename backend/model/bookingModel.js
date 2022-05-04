const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookedTimeSlots: {
        from: {
            type: String,
        },
        to: {
            type: String
        }
    },
    totalHours: {
        type: Number
    },
    totalAmount: {
        type: Number
    },

    transactionId: {
        type: String,
    },

    driverRequired: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = new mongoose.model("booking", bookingSchema)