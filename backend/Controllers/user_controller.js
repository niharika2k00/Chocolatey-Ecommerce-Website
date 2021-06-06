
import express from 'express';
import asyncHandler from 'express-async-handler';
import Generate_Web_Tokens from '../Utils/Generate_Web_Tokens.js';
import User from '../Models/UserModels.js';






// @desc       Auth users & get tokens
// @Route      POST/api/users/login              [from the client side post request]
// @access      public

const userAuth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;  // destructuring takes place
    // const ema = req.body.email;
    // res.send({ email, password });

    // Find() method ----> returns all the documents present in the collection ELSE returns nothing
    //  findOne()  ------> returns only the 1st doc when matched with the query ELSE returns NULL
    const user = await User.findOne({ email });
    console.log(user);  // <--------------- after sending the req(SEND CLICK) in Postman


    if (user && (await user.matchPassword(password))) {          // receive the returned value from ModelUser
        res.json({                                               // req.json returns the Object 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: Generate_Web_Tokens(user._id),
        })
    }
    else {
        res.status(401)
        throw new Error("Invalid email OR password");
    }
})




// @desc       Register USERS
// @Route      POST/api/users/
// @access      public

const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email }) // <------ returns the whole obj of the Person 
    // console.log(userExists);

    if (userExists) {
        res.status(400);          // Bad Req
        throw new Error("User is Aready Registered");
    }

    else {
        const new_person = await User.create({ name, email, password }); // WITH THIS CREATE METHOD the password also get HASHED frm the UserModels before save

        if (new_person) {
            res.status(201).json({    // Successfully created & led to the creation of a resource
                _id: new_person._id,
                name: new_person.name,
                email: new_person.email,
                isAdmin: new_person.isAdmin,
                password: new_person.password,
                token: Generate_Web_Tokens(new_person._id),
            })
        }
        else {
            res.status(400)
            throw new Error('Invalid user data')
        };
    }
})





// @desc       Update users profile
// @Route      PUT/api/users/profile
// @access      Private

const UpdateuserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    console.log(req.body.name)     // updated name

    if (user) {                                            // user --> Original user thats stored previously
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password)
            user.password = req.body.password;

        const Updated_User = await user.save();
        res.json({                                               // req.json returns the Object 
            _id: Updated_User._id,
            name: Updated_User.name,
            email: Updated_User.email,
            isAdmin: Updated_User.isAdmin,
            token: Generate_Web_Tokens(Updated_User._id),
        })
    }

    else {
        res.status(401);
        throw new Error('Invalid Email OR Password');
    }
})





// @desc       Get users profile
// @Route      GET/api/users/profile
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






// @desc       Get all users
// @Route      GET/api/users
// @access      Private / For Admin

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (users) {
        res.json(users)
    }
    else {
        res.status(401);
        throw new Error('NEED ADMIN ACCESS. You are not an Admin');
    }
})






// @desc        DELETE an User
// @Route       DEL/api/users/:id
// @access      Private / For Admin

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({ message: "User Removed Success" })
    }
    else {
        res.status(404);
        throw new Error('User Not Found');
    }
})




export { userAuth, userRegister, getuserProfile, UpdateuserProfile, getAllUsers, deleteUser };