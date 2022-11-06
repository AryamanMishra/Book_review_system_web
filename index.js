

/* Required module for express */
const express = require('express')
const app = express()

/* Required module for path */
const path = require('path')


/* Required module for method overriding used to include requests other than POST and GET in ejs*/   
const methodOverride = require('method-override')


/* requiring session and flash */
const session = require('express-session')
const bodyParser = require('body-parser');



/* requirelogin middleware */
const requireLogin = require('./middleware/requireLogin')


/* requiring models to be used */
const User = require('./models/user');
const Book = require('./models/book');



/* requiring db file and setting dbUrl*/
require('./db/mongoose')
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/BlogApp';
const secret = process.env.SECRET || 'helloiamasecret'




/* configuring mongo to store sessions */
const MongoDBStore = require("connect-mongo")   

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24*60*60
})

/* checking for mongo store errors */
store.on('error', () => {
    console.log('session store error')
})
 


/* configuration of a session */
const sessionConfig = {
    store,
    name:'session',
    secret, 
    resave:false, 
    saveUninitialized:true
} 


/* using session with configuration as stated above*/
app.use(session(sessionConfig))




console.log(__dirname)

/* Use method of express to access static files like html and css and images */
app.use(express.static(__dirname + '/public'));

/* Set method of express to join the path to cwd */
app.set('views',path.join(__dirname,'views'))

/* Setting view engine to ejs used for dynamic templating */
app.set('view engine','ejs')


app.use(express.json());


/* Use method of express to convert the req object to readable form */
app.use(express.urlencoded({extended:true}))

/* Use method of express to invoke methodOverride with key name '_method' */
app.use(methodOverride('_method'))


/* bodyparser */
app.use(bodyParser.urlencoded({
    extended: true
  }));




/*
    Main functionality code from here
*/




const homePageRoute = require('./routes/home')
const loginPageRoute = require('./routes/login')
const signUpPageRoute = require('./routes/signup')
const logOutRoute = require('./routes/logout')

const userHomeRoute = require('./routes/userHome')





app.use('/', homePageRoute)
app.use('/', loginPageRoute)
app.use('/', signUpPageRoute)
app.use('/', logOutRoute)
app.use('/', userHomeRoute)








/* Get request for any other route requested by user */
app.get('*', requireLogin, (req,res) => {
    res.render('pageNotFound')
})




/* Setting up local or heroku generated port and adding to listen event*/
const port = process.env.PORT || 3333
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`)
})