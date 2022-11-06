const { Router } = require('express');
const express = require('express');
const router = express.Router();


const requireLogin = require('../middleware/requireLogin')

/* Required models to be used */
const User = require('../models/user');
const Books = require('../models/book');


/* User home page */
router.get('/users/:id/home', requireLogin, async(req,res) => {
    const { id } = req.params
    const user = await User.findById(id)
    const books = await Books.find()
    res.render('users/userHome', {user,books}) // Home page
}) 


module.exports = router