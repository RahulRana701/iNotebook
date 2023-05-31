const express = require('express');
const router = express.Router();

// create a user or store the data in database of user for that we have to import the user first
const User = require('../models/User');

// imported jsonwebtoken
const jwt = require('jsonwebtoken');

// creating secret , put this in enviorment variable
const JWT_SECRET = "rahulran$a"

// added validator
const { body, validationResult } = require('express-validator');

// imported bcryptjs
const bcrypt = require('bcryptjs');

// importing middleware
var fetchuser = require('../middleware/fetchuser');

//    made a new user and no login required ,this can basically be a signup page
router.post('/', [

   // these are our conditions , so that no scams happens , can also give default values if error occurs
   // these , isLength and isEmail is a 
   body('name', 'enter valid name').isLength({ min: 5 }),
   body('email', 'enter valid email').isEmail(),
   body('password', 'password incorrect').isLength({ min: 5 }),
],

   async (req, res) => {
      let success = false;
      // if some error happens show status 400 the error as json
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ success, errors: errors.array() });
      }


      // we are surrounding this thing in try and catch to make a proper thing
      try {

         let user = await User.findOne({ email: req.body.email });
         // if you find any user with same email  , return a error
         if (user) {
            return res.status(400).json({ success, error: "sorry this email already exsists" });
         }

         // now created user like this , and at end it is returning a promise to user we will upgrade this by making it a as
         // ync function so that we don't use   .then()
         // created a user.


         // this is how we use salt as written in javascript
         const salt = await bcrypt.genSaltSync(10);

         // bcrypt js will do internal handling on it's own , this will generate a hashkey with salt of my password
         // i can see it my database
         const secpass = await bcrypt.hashSync(req.body.password, salt);


         user = await User.create({
            name: req.body.name,
            password: secpass,
            // earlier created password like this but now we will create it using bycrptjs
            // password: req.body.password,
            email: req.body.email,
         })

         //  earlier created user like this 
         // console.log(req.body);
         // const user = User(req.body);
         // user.save();
         // res.send(req.body);

         // we will not send this here we will send token here
         // res.json(user);

         // the payload data we are sending or data sending in token is id (mongodb database mei id hoti hai jo)
         const data = {
            user: {
               id: user.id
            }
         }

         // the second parameter of jwt.sign is secret and we are sending the data
         var token = jwt.sign(data, JWT_SECRET);
         success = true;
         console.log(token);
         res.json({ success, token });

      } catch (error) {
         console.error(error.message);
         res.status(500).send("some error occured")
      }
   })


// this can basically be a signup page
router.post('/login', [
   // we will take only id and password from user
   body('email', 'enter valid email').isEmail(),
   body('password', 'password cannot be blank').exists(),
],
   async (req, res) => {

      // checking for the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         success = false;
         return res.status(400).json({ success, errors: errors.array() });
      }


      // we will take out email and password from req.body
      const { email, password } = req.body;

      try {
         // we will check whether there exsist a user or not with that email in our database
         let user = await User.findOne({ email });
         if (!user) {
            success = false;
            return res.status(400).json({ success, error: "login with correct credentials" })
         }

         //   now we will compare the passwords one that user entered with one that is in our database , hashing done automatically
         const passwordcompare = await bcrypt.compare(password, user.password);
         if (!passwordcompare) {
            success = false;
            return res.status(400).json({ success, error: "login with correct credentials" })
         }
         else {
            // we will send the token

            const data = {
               user: {
                  id: user.id
               }
            }
            var token = jwt.sign(data, JWT_SECRET);
            console.log(token);
            success = true;
            res.json({ success, token });
         }

      } catch (error) {
         console.error(error.message);
         res.status(500).send("internal server error occured")
      }

   }
)

// we are creating a third router to get the details of logged in user, there is user id also in the token.

router.get('/getuser', fetchuser,
   async (req, res) => {
      try {
         // first taken the user id with the help of fetch user function
         userID = req.user.id;

         // this means select all the details of user accept password
         const user = await User.findById(userID).select("-password");

         res.send(user);
      } catch (error) {
         res.status(500).send({ error: "internal server error" })
      }
   }
)





module.exports = router


//    save method saves the data in database