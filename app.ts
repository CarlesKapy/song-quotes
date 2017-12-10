import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as dotenv from 'dotenv'
import * as uuidv4 from 'uuid/v4'

const api = require('./routes/api/index')

dotenv.load()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
    session({
        secret: uuidv4(),
        resave: true,
        saveUninitialized: true
    })
)

app.use('/api/v1', api)

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