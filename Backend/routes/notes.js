const express = require('express');
// now we will use the router of express , there is a router in express.
const router = express.Router();

// will use notes model here
const Notes = require('../models/Notes');

const user = require('../models/User');

// will use middleware here as well
var fetchuser = require('../middleware/fetchuser');

// added validator
const { body, validationResult } = require('express-validator');

// this route will fetch all the notes of the user who is already login 
// this route originally will be /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    // find the notes of the user who logged in , due to fetchuser middle ware we will be able to get userID

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }

})


// we will create a different route to add the notes

router.post('/addnote', fetchuser, [

    // we will do almost same thing we did in authetication

    body('title', 'enter valid title').isLength({ min: 3 }),
    body('description', 'enter a valid description').isLength({ min: 5 }),

],
    async (req, res) => {

        try {
            const { title, description } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // we will add a note now

            const note = new Notes({
                // we will add these 3 things in our note
                title, description, user: req.user.id
            })
            // now we will save our note
            const savednotes = await note.save();
            res.json(savednotes)
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured")
        }
    })

//  we will make a another route to update our notes , we will first get the note with it's id and then update
//    it , updatenote/this is the id of the note

router.post('/updatenote/:id', fetchuser, async (req, res) => {
    // we will fetch these two things from the body
    const { title, description } = req.body;

    // will create a newnote
    const newnote = {};
    // if there is a title of our note whose id we put in the /update/:id then add that title to our newnote;
    if (title) {
        newnote.title = title;
    }
    if (description) {
        newnote.description = description;
    }

    // now find the note and update the note
    // is ka mtlb vo note dhundo jiski id humne param mei daali hai
    let note = await Notes.findById(req.params.id);

    // if no note exsists
    if (!note) {
        return res.status(404).send("Not Found");
    }

    // this is to check ki jo logged in user hai vo apne hi notes update kr paaye kisi aur ke nhi , 
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    // now finally update the note, this new:true is also an object which says ki agr kuch naya aayega to apne
    // aap create hojega
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
    res.json({ note });
})

// we will make a another router to delete a note.

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    // now find the note to be deleted 
    let note = await Notes.findById(req.params.id);

    // if no note exsists
    if (!note) {
        return res.status(404).send("Not Found");
    }

    // allow the deletion of the note if the user owns it 
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    // now finally update the note, this new:true is also an object which says ki agr kuch naya aayega to apne
    // aap create hojega
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "Success": "The note has been finally deleted" });
})











// we have to export this in order to use router in index.js because we have used routes folder in that
// and in routes folder router is used hence to use it in index.js we have to export it and import it in index.js

module.exports = router