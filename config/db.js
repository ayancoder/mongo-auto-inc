const mongoose = require("mongoose");
const config = require("config");
const dbURI = config.get("mongoURI");

const connectDB = async () => {
  
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,     
    useUnifiedTopology: true 
    }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
    });
};
module.exports = connectDB;
