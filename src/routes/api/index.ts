import * as express from 'express'
import findQuote from "../../repository/QuoteRepository"

const router = express.Router()

/**
 * @apiGroup SongQuote
 * @apiName GetSongQuote
 * @apiVersion 1.0.0
 *
 * @apiDescription Endpoint to retrive a song quote that matches with criteria
 *
 * @api {get} /songquote Retrieve Song quote
 * @apiParam {String} lang Language of the quote
 *
 * @apiSuccess {String} lang   Language of the quote
 * @apiSuccess {String} artist Author of the quote
 * @apiSuccess {String} song   Title of the song where quotes appear
 * @apiSuccess {String} quote  Quote
 *
 * @apiError 400 Bad Request (no lang informed)
 */
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