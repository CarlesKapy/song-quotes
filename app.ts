import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as dotenv from 'dotenv'
import * as uuidv4 from 'uuid/v4'

import * as landing from './routes/landing'
import * as api from './routes/api/index'

dotenv.load()

const app = express()

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Expres Session
app.use(
    session({
        secret: uuidv4(),
        resave: true,
        saveUninitialized: true
    })
)

// Twig render engine
app.set('views', __dirname + '/views')
app.set('view engine', 'twig')
app.set('twig options', {
    strict_variables: false
})

// Static files served from public folder
app.use(express.static('public'))

// Routes
app.use('/', landing)
app.use('/api/v1', api)

// No route found
app.use( (req, res, next) => {
    let err:any
    err= new Error("Not found")
    err.status = 404
    next(err)
})


// Development error handler -- with message
if (app.get('env') == 'development') {
    app.use( (err, req, res, next) => {
        res.status(err.status || 500)
        res.send(err.message)
    })
}

// Production error handler -- without message
app.use ( (err, req, res, next) => {
    res.status(err.status || 500)
    res.send("Error")
})

module.exports = app