const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (recipientCollection) => {
    router.post('/', async (req, res) => {
        const data = req.body
        console.log(data);
        try {
            if (!data || !data.name || !data.email || !data.company || !data.role || !data.painPoint || !data.outreachGoal) return res.status(400).json({ message: "Invalid input data" })

            const result = await recipientCollection.insertOne(data)

            await axios.post(`${process.env.n8nBaseURL}/98f9504e-f872-4de9-afd8-cdd7b72b1e7d`, {
                recipientId: result.insertedId.toString(),
                name: data.name,
                email: data.email,
                company: data.company,
                role: data.role,
                painPoint: data.painPoint,
                goal: data.outreachGoal
            })


            res.status(201).json({ message: "Data stored & webhook triggered" })
            // return res.status(201).json({ message: "Data stored successfully" })
        } catch (error) {
            return res.status(500).json({ message: "server error", error: error.message })
        }

    })

    return router
}