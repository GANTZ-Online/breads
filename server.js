// DEPENDENCIES
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const express = require('express');

// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//mongoose call
mongoose.connect(process.env.MONGO_URI)

// ROUTES
app.get('/', (req,res) =>{
    res.send('Welcome to an awsome App about Breads!');
});

// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})


// LISTEN
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});

