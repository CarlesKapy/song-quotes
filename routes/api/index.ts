import * as express from 'express'
import findQuote from "../../repository/QuoteRepository"

const router = express.Router()

router.get('/songquote', (req, res, next) => {
    const queryIsEmpty = Object.keys(req.query).length === 0

    if (queryIsEmpty) {
        res.status(400).json({error: "Bad request"})
        return next(res)
    }

    const results = findQuote(req.query)
    if (results.length === 0) {
        res.status(204)
        res.json(results)
        return next(res)
    }
    res.json(results[Math.floor(Math.random()*results.length)])
    return next(res)
})

module.exports = router