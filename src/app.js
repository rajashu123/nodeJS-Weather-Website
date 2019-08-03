const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// Heroku will set it in env variable so we have to read it from there
// We can not hardcord the port number.
// So locally 3000 will be used and on heroku from env file port numer will be used
const port = process.env.PORT || 3000
/* consider we have a domain app.com. It will have pages like
   app.com/help , app.com/about etc

   express package has only one function ie express
    It has a fucntion called get, which takes 2 arguments. This fucntion 
    decides what to do when a page is loaded

    It takes 2 arguments, one is reference url(reference to home page and second is a function.
   This function decides what to do when te url is loaded,.
   This function takes 2 arguments, one is object
       
*/
console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// path module is core modele and join methid is quite handy

// defining paths for express config
const publicpath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setting handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve having css, js, images etc
app.use(express.static(publicpath))
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather application",
        name: "Ashutosh Raj"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: "Ashutosh Raj",
        title: "About Me"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "For any help call at 8132896182",
        name: "Ashutosh Raj",
        title: "Help"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter a search term"
        })
    }
    //const address = req.query.address;
    geocode(req.query.address, (error, { latitude, longitude, place_name } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecast_data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                place_name,
                address: req.query.address,
                weather: forecast_data.summary + forecast_data.forcast

            })
            //console.log(chalk.red.bold(place_name))
            //console.log(forecast_data.summary + '\n' + forecast_data.forcast)
        })

    })
})

app.get('/product', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send('Please enter a search term')

    }
    res.send({
        product: ['Ashutosh', 'Raj']
    })

})

app.get('/help/*', (req, res) => {
    res.render('errors', {
        title: 404,
        errorMsg: 'Help article can not be located, try other links from top of page',
        name: 'Ashutosh Raj'
    })
})
app.get('*', (req, res) => {
    res.render('errors', {
        title: 404,
        errorMsg: 'Page Not Found ,try other links from top of page ',
        name: 'Ashutosh Raj'
    })

})  
app.listen(port, () => {
    console.log('Server is started on port ' + port)
})