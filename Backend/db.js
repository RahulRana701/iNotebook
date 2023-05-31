// we will connect with our database that is mongodb from here.
const mongoose = require('mongoose');

// mere mongod system se connect hone ki connection key hai ye
const mongoURI = "mongodb://127.0.0.1:27017"

const connecttoMongo = () => {

    // mongoose.connect is a function, mongoose.connect no longer accepts callback(newer version)
    mongoose.connect(mongoURI);{
        console.log("connect to mongo successfully");
    }
}

module.exports = connecttoMongo;