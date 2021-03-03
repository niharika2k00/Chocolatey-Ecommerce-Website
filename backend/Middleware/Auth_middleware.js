
// For Auth write ------> jwt(middleware) , controller , usermodule

import jwt from "jsonwebtoken";
import User from '../Models/UserModels.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
    var token;
    // console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {          // Token Found
        try {
            token = req.headers.authorization.split(' ')[1];           // arr[0] = Bearer , arr[1] = token
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);  //jwt.verify(token, secretOrPublicKey, [options, callback])
            console.log(decoded);
            req.user = await User.findById(decoded.id).select('-password');  // xcept the password
            console.log(req.user);
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("NOT AUTHORIZED , TOKEN FAILED");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("NOT found Token")
    }

})

export { protect };