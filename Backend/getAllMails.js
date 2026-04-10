const express = require('express')
const router = express.Router()

module.exports = (emailCollection) => {
    router.get('/', async (req, res) => {

        try {
            const query = await emailCollection.find().toArray()
            res.send(query)
        } catch (error) {
            return res.status(500).json({ message: "internal server error", error: error.message })
        }
    })
    return router
}
