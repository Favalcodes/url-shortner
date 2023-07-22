const mongoose = require('mongoose')

const connectDb = (url) => {
    try {
        return mongoose.connect(url)
    } catch (error) {
        return new Error(error)
    }
}

module.exports = connectDb