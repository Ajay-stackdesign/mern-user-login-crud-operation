const Car = require("../model/carModel")
const cloudinary = require("cloudinary")

exports.addCar = async (req, res, next) => {
    // req.body.user = req.user.id;
    try {

        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "car",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
        console.log(imagesLinks)

        const car = await Car.create(req.body)
        console.log(car)
        res.status(200).json({
            success: true,
            car
        })
    } catch (err) {
        res.status(500).json(err)
    }
}


exports.getAllCar = async (req, res, next) => {
    try {
        const cars = await Car.find()
        res.status(200).json({
            success: true,
            cars,
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getSingleCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id)

        if (!car) {
            return res.status(500).json("Car not found")
        }

        res.status(200).json({
            success: true,
            car
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updateCar = async (req, res, next) => {
    try {
        let car = await Car.findById(req.params.id)
        console.log(car)
        if (!car) {
            return res.status(500).json("Car not found")
        }

        let images = []

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images
        }

        if (images !== undefined) {
            for (let i = 0; i < car.images.length; i++) {
                await cloudinary.v2.uploader.destroy(car.images[i].public_id);
            }

            const imagesLinks = []

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "car"
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                })
            }

            req.body.images = imagesLinks;
            console.log(imagesLinks)
        }


        car = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: true,
            runValidators: true
        })
        console.log(car)

        res.status(200).json({
            success: true,
            car
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteCar = async (req, res, next) => {
    try {
        let car = await Car.findById(req.params.id)

        if (!car) {
            return res.status(500).json("Car not found")
        }

        for (let i = 0; i < car.images.length; i++) {
            await cloudinary.v2.uploader.destroy(car.images[i].public_id);
        }

        await car.remove()

        res.status(200).json({
            success: true,
        })

    } catch (err) {
        res.status(500).json(err)
    }
}

