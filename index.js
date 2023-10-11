const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// middleware start
app.use(cors());
app.use(express.json());
// middleware end

//mongodb start

//mongodb End


app.get('/',(req,res)=>{
 res.send('Server is canected')
});




app.listen(port,()=>{
    console.log(`Ami kisu pari na ${port}`)
})
