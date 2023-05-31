// we will put or schema in models

const mongoose = require('mongoose');
// have to import schema as well
const { Schema } = mongoose;


// will write our schema here
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        // we will not call the function here that is date() because we want to run this date.now function when 
        //  this runs
         default:Date.now
    }
});

// now we will make a modal through this schema and will use it in routes.
// second paramter is name of schema and first is the name of the modal you want.

const User=mongoose.model('user',UserSchema);
User.createIndexes();
module.exports=User;