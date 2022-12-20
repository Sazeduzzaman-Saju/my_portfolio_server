const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kystxht.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const webDevelopmentCollection = client.db('szamansajuPortfolio').collection('web_development');
        const contactCollection = client.db('szamansajuPortfolio').collection('contact');
        // All Appointment Options 
        app.get('/projects', async (req, res) => {
            const query = {};
            const result = await webDevelopmentCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await webDevelopmentCollection.findOne(query);
            res.send(result)
        })
        app.get('/contact', async (req, res) => {
            const query = {};
            const result = await contactCollection.find(query).toArray();
            res.send(result)
        })
        app.post('/contact', async (req, res) => {
            const userBook = req.body;
            const result = await contactCollection.insertOne(userBook);
            res.send(result);
        })


    }
    finally {

    }


}
run().catch(error => console.error(error))
run().catch(error => console.error(error))


app.get('/', (req, res) => {
    res.send('portfolio Api Running ')
})

app.listen(port, () => {
    console.log(`portfolio Running in ${port}`)
})