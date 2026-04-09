const express = require('express');
const router = express.Router()

module.exports = (emailCollection) => {
    router.post('/', async (req, res) => {
        const email = req.body;
        console.log(typeof email);
        try {
            if (!email) return res.status(400).json({ message: "Invalid email" })

            const result = await emailCollection.insertOne(email)

            res.status(201).json({ message: "Email stored in database", id: result.insertedId })
        } catch (error) {
            return res.status(500).json({ message: "server error", error: error.message })
        }
    })
    return router
}