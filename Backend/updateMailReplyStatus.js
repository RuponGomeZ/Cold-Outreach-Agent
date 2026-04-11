const express = require('express')
const router = express.Router()

module.exports = (emailCollection) => {
    router.patch('/', async (req, res) => {
        const emailToUpdate = req.body.to
        try {
            if (!emailToUpdate) {
                return res.status(400).json({ message: "Invalid data" })
            }
            const findMail = { to: emailToUpdate }
            const updatedDoc = {
                $set: {
                    replied: true
                }
            }
            const result = await emailCollection.updateOne(findMail, updatedDoc)
            if (result.matchedCount === 0) {
                return res.status(400).json({ message: "Email not found" })
            }
            res.status(201).json({ message: "Email status updated successfully" })
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message })
        }
    })
    return router
}