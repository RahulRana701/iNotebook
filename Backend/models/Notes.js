// we will put or schema in models

const mongoose = require('mongoose');
const { Schema } = mongoose;

// will write our schema here
const NotesSchema = new Schema({

    // ab kisi user ne notes add kiye chahte hai ki user ke notes koi aur na dekh ske , so somehow we have to make
    // these notes associate to the user.., means ki pata lag jaye ki kis user ke notes hai .


    // now we can store the user.
    user: {
        // model , user se hum object id layege, logged in user ki ;
        type: mongoose.Schema.Types.ObjectId,

        //  modal ka naam
        ref: 'user'
    },

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('notes', NotesSchema)

