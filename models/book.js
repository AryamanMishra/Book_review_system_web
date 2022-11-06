const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    number: {
        type:Number,
        required:true 
    },
    rating:{
        type:Number,
        required:true,
        default:5
    }
})


const Books = new mongoose.model('Books', bookSchema)

module.exports = Books