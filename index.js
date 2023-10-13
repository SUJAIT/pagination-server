const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


// middleware start
app.use(cors());
app.use(express.json());
// middleware end

//mongodb start


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.oazbejc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //
     const database = client.db("emajon");
        const emajon = database.collection("all-data"); 
    //

    //data load for get start
    app.get('/alldata', async (req, res) => {
       const page = parseInt(req.query.page) || 0;
       const limit = parseInt(req.query.limit) || 10;
       const skip = page * limit;
        const result = await emajon.find().skip(skip).limit(limit).toArray();
        res.send(result);
    })
    //data load for get End

    //
    app.get('/totalProducts',async(req,res)=>{
      const result = await emajon.estimatedDocumentCount();
     res.send({totalResult: result})
    })
    //

    //_ids
    // app.post('/productsids',async (req,res) =>{
    //   const ids = req.body
    //   console.log(ids);
    // })
    //


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//mongodb End


app.get('/',(req,res)=>{
 res.send('Server is canected')
});




app.listen(port,()=>{
    console.log(`Ami kisu pari na ${port}`)
})
