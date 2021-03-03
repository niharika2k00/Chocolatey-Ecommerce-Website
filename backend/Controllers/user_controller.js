
import express from 'express';
import asyncHandler from 'express-async-handler';
import Generate_Web_Tokens from '../Utils/Generate_Web_Tokens.js';
import User from '../Models/UserModels.js';

// @desc       Auth users & get tokens
// @Route      POST/api/user/login
// @access      public

const userAuth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;  // destructuring takes place
    // const ema = req.body.email;
    // res.send({ email, password });

    // Find() method ----> returns all the documents present in the collection ELSE returns nothing
    //  findOne()  ------> returns only the 1st doc when matched with the query ELSE returns NULL
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({                                               // req.json returns the Object 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: Generate_Web_Tokens(user._id),
        })
    }
    else {
        // res.send(401)
        res.status(401)
        throw new Error("Invalid email OR password");
    }
})



// @desc       Register USERS
// @Route      POST/api/users
// @access      public

const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);          // Bad Req
        throw new Error("User is Aready Registered");
    }

    const person = await User.create({ name, email, password });

    if (person) {
        res.status(201).json({   // Successfully created & led to the creation of a resource
            _id: person._id,
            name: person.name,
            email: person.email,
            isAdmin: person.isAdmin,
            token: Generate_Web_Tokens(person._id),
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    };

})







// @desc       Get users profile
// @Route      GET/api/user/profile
// @access      Private

const getuserProfile = asyncHandler(async (req, res) => {
    // res.send("Sucess");
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({                                               // req.json returns the Object 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }

    else {
        res.status(401);
        throw new Error('Invalid Email OR Password');
    }
})


export { userAuth, userRegister, getuserProfile };