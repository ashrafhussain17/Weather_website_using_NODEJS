const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')


const app = express()

// Define paths for Express congig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Ashraf Hussain'
    })
})

app.get('/about', (req , res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashraf Hussain'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'Help text part',
        title: 'Help',
        name: 'Ashraf Hussain'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error: 'Address must be provide'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // else {
    //     res.send({
    //         forecast: 'It is raining',
    //         location: 'Dhaka',
    //         address: req.query.address

    //     })
    // }

})

app.get('/products', (req , res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.price);
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Ashraf Hussain',
        page1: 'Help article not found'

    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Ashraf Hussain',
        page: '404 not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})