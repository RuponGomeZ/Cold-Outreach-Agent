const express = require('express');
const sendMail = require('./sendMail');
const router = express.Router()

module.exports = (emailCollection) => {
    router.post('/', async (req, res) => {
        const email = req.body;
        console.log(email);
        try {
            if (!email) return res.status(400).json({ message: "Invalid email" })

            const result = await emailCollection.insertOne(email)

            if (result.insertedId) {
                const subjectMatch = email.output.match(/^Subject:\s*(.+)/);
                const subject = subjectMatch ? subjectMatch[1].trim() : '';

                const emailBodyStart = email.output.indexOf('Email:\n');
                const bodyAndFooter = email.output.slice(emailBodyStart + 'Email:\n'.length).trim();
                const footerMatch = bodyAndFooter.search(/^Best,$/m);
                const body = bodyAndFooter.slice(0, footerMatch).trim();

                const to = email.to;
                sendMail(to, subject, body);
            }

            res.status(201).json({ message: "Email stored in database", id: result.insertedId })
        } catch (error) {
            return res.status(500).json({ message: "server error", error: error.message })
        }
    })
    return router
}