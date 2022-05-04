const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        // default: "maruti"
        required: true
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    capacity: {
        type: String,
        // default: "20"
        required: true
    },
    fuelType: {
        type: String,
        required: true
        // default: "petrol"
    },
    bookedTimeSlots: [
        {
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            }
        }
    ],
    rentPerHour: {
        type: Number,
        required: true
        // default: 200
    },
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: false,
    // },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = new mongoose.model("Car", carSchema)
