require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const { MongoClient, ServerApiVersion } = require('mongodb');
const axios = require('axios');
const postData = require('./postData');
const postEmail = require('./postEmail');
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

        // app.post('/store-data', async (req, res) => {
        //     const data = req.body
        //     console.log(data);
        //     try {
        //         if (!data || !data.name || !data.email || !data.company || !data.role || !data.painPoint || !data.outreachGoal) return res.status(400).json({ message: "Invalid input data" })

        //         const result = await recipientCollection.insertOne(data)

        //         await axios.post(`${process.env.n8nBaseURL}/98f9504e-f872-4de9-afd8-cdd7b72b1e7d`, {
        //             recipientId: result.insertedId.toString(),
        //             name: data.name,
        //             email: data.email,
        //             company: data.company,
        //             role: data.role,
        //             painPoint: data.painPoint,
        //             goal: data.outreachGoal
        //         })


        //         res.status(201).json({ message: "Data stored & webhook triggered" })
        //         // return res.status(201).json({ message: "Data stored successfully" })
        //     } catch (error) {
        //         return res.status(500).json({ message: "server error", error: error.message })
        //     }

        // })
        app.use("/store-data", postData(recipientCollection))
        app.use("/post-email", postEmail(emailCollection))

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