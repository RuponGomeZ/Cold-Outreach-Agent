const express = require('express')
const router = express.Router()

module.exports = (emailCollection) => {
    router.get('/', async (req, res) => {
        console.log(new Date().toISOString());

        try {
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

            const docs = await emailCollection.find({
                time: { $lte: threeDaysAgo }
            }).toArray();

            res.send(docs)

        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            })
        }
    })

    return router
}