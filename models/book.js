const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true 
    },
    rating:{
        type:Number,
        required:true
    }
})


const Book = new mongoose.model('Blog', bookSchema)

module.exports = Book