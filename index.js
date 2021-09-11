const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const itemRoute = require('./route/items');
const userRoute = require('./route/users');

const app = express();
app.use(cors());
connectDB()

const PORT = process.env | 5000;
app.use(cors())
app.use(express.json({extended : false}));
app.get('/', (req, res)=> {
    res.send("welcome");
})
app.use('/api/items', itemRoute);
app.use('/api/users', userRoute);

app.listen(PORT, ()=> { console.log(`node started ${PORT}`)});