
/*
req.params ---> contains route parameters (in the path portion of the URL), 
                If route is /user/:id, then request to http://localhost:3200/user/5 - req.params would yield {id: "5"}

req.query --->  contains the URL query parameters (after the ? in the URL).
                http://localhost:3200/user?name=tom&age=55 - req.query would yield {name:"tom", age: "55"}

req.query is an object containing the property for each query string parameter in the route.
req.params will return parameters in the matched route. If your req.param is a function that peels
parameters out of the request. 
*/

/* const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const products = require('./Data/products.js'); */




// syntax using ESSCRIPT
import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './config/DB.js';
import { notFound, errorHandler } from './Middleware/Error_middleware.js';
import colors from 'colors';
import cors from 'cors';
import product_routes from './Routes/product_routes.js';
import products from './Data/products.js';
import user_routes from './Routes/user_routes.js';
import order_routes from './Routes/order_routes.js';




dotenv.config();
ConnectDB();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to      
    credentials: true,
  })
);

app.use(express.json());                           //allows json data in the body

// SYNTAX: app.get( path, callback )
app.get('/', (req, res) => {                       //ES6 FUNCTION    
  res.send('API is running succesfully');
})


// http://localhost:8090/users/getUser/userid11/postid22
/* app.get('/users/getUser/:userid/:postid', (req, res) => {
  console.log(req.params); // {userid: userid11, postid: postid22}
  res.send({});
})

// http://localhost:8090/users/getUser?userid=userid11&postid=postid22 ----- /users/getUser?userid&postid
// http://localhost:8090/user?name=Niharika&age=11
app.get('/user', (req, res) => {
  console.log("Name: ", req.query.name);
  console.log("Age:", req.query.age);
  console.log(req.query);      // {userid: userid11, postid: postid22}
  console.log(req.body);       // {}
  res.send();
}) */


// GET method Route  --- shifted to product_routes
/* app.get('/api/products', function (req, res) {
  console.log("Triggered route");
  res.json(products);
})

app.get('/api/products/:id', (req, res) => {
  const prod = products.find((p) => p._id === req.params.id);
  res.send(prod);
}) */
// SYNTAX: app.use(path, callback)
app.use('/api/products', product_routes);
app.use('/api/users', user_routes);
app.use('/api/orders', order_routes);

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})



app.use(notFound);
app.use(errorHandler);
// app.use()
const port = process.env.PORT || 8090
app.listen(port, console.log(`Server Connected in ${port} for ${process.env.NODE_ENV}`));



// port change if needed ---> server.js ,.env,frontend - backendurl 
// MONGODB_COMPASS :: mongodb+srv://niharika_28:niharika_28@niharika-dutta.oot45.mongodb.net/Ecommerce

/*

STEPS ::

1) npm i                  ----> /
2) npm i                  ----> cd frontend
3) npm start              ----> start only frontend (cd frontend)
4) npm run server         ----> start only Backend(SERVER)
5) npm run dev            ----> start both Frontend(CLIENT SIDE) & Backend(SERVER SIDE)
6) Add .env file  :


PORT = 8090
NODE_ENV = "development purpose"
MONGODB_URI = mongodb+srv://niharika_28:niharika_28@niharika-dutta.oot45.mongodb.net/Ecommerce?retryWrites=true&w=majority
JWT_TOKEN = abc@123



*/




/* const middleware = (req, res, next) => {
  // code...
  next();
  }
  app.use(middleware());

  */
