const express = require('express')
const router = express.Router()

module.exports = (emailCollection) => {
    router.get('/', async (req, res) => {
        try {
            const getEmails = await emailCollection.find().toArray()
            res.status(200).json(getEmails)
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message })
        }
    })
    return router
}