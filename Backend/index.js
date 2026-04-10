require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const { MongoClient, ServerApiVersion } = require('mongodb');
const axios = require('axios');
const postData = require('./postData');
const postEmail = require('./postEmail');
const findThreeDaysOldMails = require('./findThreeDaysOldMails');
const getAllMails = require('./getAllMails');
const updateMailReplyStatus = require('./updateMailReplyStatus');
const getStatus = require('./getStatus');
const corsOption = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}
app.use(express.json());
app.use(cors(corsOption));
const uri = `${process.env.mongodbURI}`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();
        const recipientCollection = client.db('outreach').collection('recipients')
        const emailCollection = client.db('outreach').collection('emails')


        app.use("/store-data", postData(recipientCollection))
        app.use("/post-email", postEmail(emailCollection))
        app.use("/find-three-days-old-mails", findThreeDaysOldMails(emailCollection))
        app.use("/get-all-mails", getAllMails(emailCollection))
        app.use("/update-mail-reply-status", updateMailReplyStatus(emailCollection))
        app.use("/get-status", getStatus(emailCollection))

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})