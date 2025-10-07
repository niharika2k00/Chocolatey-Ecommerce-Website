/*
  req.params ---> contains route parameters (in the path portion of the URL),
                  If route is /user/:id, then request to http://localhost:3200/user/5 - req.params would yield {id: "5"}

  req.query --->  contains the URL query parameters (after the ? in the URL).
                  http://localhost:3200/user?name=tom&age=55 - req.query would yield {name:"tom", age: "55"}

  req.query is an object containing the property for each query string parameter in the route.
  req.params will return parameters in the matched route. If your req.param is a function that peels
  parameters out of the request.


  Content-Type Header ----->  tells the client what the content type of the returned content .



  */

/* const express = require('express');
  const dotenv = require('dotenv');
  const cors = require('cors'); */

// syntax using ESSCRIPT
import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/DB.js";
import { notFound, errorHandler } from "./Middleware/Error_middleware.js";
import cors from "cors";
import path from "path";
import product_routes from "./Routes/product_routes.js";
import user_routes from "./Routes/user_routes.js";
import order_routes from "./Routes/order_routes.js";
import upload_routes from "./Routes/upload_routes.js";

dotenv.config();
ConnectDB();
const app = express();

app.use(express.json());
app.use(cors());
/* app.use(
    cors({
      origin: "*", // <-- location of the react app were connecting to
      credentials: true,
    })
  ); */

app.use(express.json()); // allows json data in the body
// process.env.NODE_ENV === "development" && app.use(morgan("dev")); // popular HTTP request logger middleware for nodejs

// SYNTAX: app.get( path, callback )
/* app.get("/", (req, res) => {
    res.send("API is running succesfully");
  }); */

// http://localhost:5050/users/getUser/userid11/postid22
/* app.get('/users/getUser/:userid/:postid', (req, res) => {
    console.log(req.params); // {userid: userid11, postid: postid22}
    res.send({});
  })

  // http://localhost:5050/users/getUser?userid=userid11&postid=postid22 ----- /users/getUser?userid&postid
  // http://localhost:5050/user?name=Niharika&age=11
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

// Express processes routes in the order they're defined:

// SYNTAX: app.use(path, callback)
app.use("/api/products", product_routes);
app.use("/api/users", user_routes);
app.use("/api/orders", order_routes);
app.use("/api/upload", upload_routes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "./uploads")));
// app.use('./uploads', express.static(path.join(__dirname, './uploads'))); // __dirname ----> is available in express with common JS,but as we are using ES^ so we have to make that
// console.log("path = ", (path.join(__dirname, './uploads')))

// Serve React frontend build files for both development and production environment without running the frontend server separately at port 3000
// Development: serve from ../frontend/build
// Production: serve from ./public (Docker container)
const buildPath =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, "./public")
    : path.join(__dirname, "../frontend/build");

// Serve static files from React build
app.use(express.static(buildPath));

// Handle React Router - return index.html for all non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "API route not found" });
  }

  // Serve React frontend for all other routes
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use(notFound);
app.use(errorHandler);
// app.use()
const port = process.env.PORT || 5050;
app.listen(
  port,
  console.log(
    `Server Connected in ${port} for ${process.env.NODE_ENV}`.cyan.bold
  )
);

// port change if needed ---> server.js , .env, frontend - backendurl

/*
  ADMIN
  admin@gmail.com
  12345


  STEPS ::

  1) npm i                  ----> /
  2) npm i                  ----> cd frontend
  3) npm start              ----> start only frontend (cd frontend)
  4) npm start || npm run start         ----> start only Backend(cd backend SERVER)
  5) npm run dev            ----> start both Frontend(CLIENT SIDE) & Backend(SERVER SIDE)
  6) npm run data:import    ----> for importing into the Database
  7) Add .env file :

  npm run build -> for craco build

  For building the frontend, we need to run the following command:
  cd frontend && npm run build



  PORT=5050
  NODE_ENV=production
  MONGODB_URI=mongodb+srv://niharika:dbpassword123@cluster0.0njtlop.mongodb.net/Ecommerce?retryWrites=true&w=majority
  JWT_TOKEN=abc@123
  PAYPAL_CLIENT_ID=AceHkmmupJasiEWdEUthEPJQSlLfDXD1aTQuxzQQ3VD15DD-I6IdyuxJPtQgFw_cOhFik-IrHZ87or41
  PAYPAL_SECRET_ID=EIZqtLuiEhgnMfV3WTwHRePwwfs1804ORJbHJQnNn0m6aBl1Irw0Ts7EVHmP0gcCEzIrFsYBWL2HDdNA



  Emma Lawson
  Emily Carter
  Olivia Bennett
  Lucas Parker




  sb-e147tu45057405@personal.example.com
  Q!&bDA6M

  */

/* const middleware = (req, res, next) => {
    // code...
    next();
    }
    app.use(middleware());


    223.223.138.236


    http://115.187.34.234:5050/



    MONGODB USERNAME AND PASSWORD
    niharika
    dbpassword123

    - In MongoDB Atlas, create a database
    - In the database, build a new cluster (or collection or tables)
    - now upload sample data in the collection using seeder.js
    - now we can use the database in the server.js

  Configure Access
  Database Access: Add user with username/password (e.g., niharika/dbpassword123)
  Network Access: Add IP address (0.0.0.0/0 for development)

    If get Atlas cluster IP whitelist error, then add the IP address in the Atlas cluster > Network Access tab
    Now I've set it to 0.0.0.0/0
    To create new user goto Database Access


    mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/<database_name>?retryWrites=true&w=majority


    now using the mongodb uri connect in compass
    MONGODB_URI=mongodb+srv://niharika:dbpassword123@cluster1.q1fgmra.mongodb.net/ecommerce_chocolatey?retryWrites=true&w=majority


  brew install mongosh
  mongosh --version

  mongosh

  // connect to the database
  mongosh <mongodb_uri>


    // Show current database
  db.getName()

  show dbs
  use ecommerce_chocolatey
  show collections
  db.users.find();
  db.users.countDocuments();
  db.users.find({ isAdmin: true })
  db.users.findOne({ email: "admin@example.com" })


  db.products.find({ numReviews: { $gt: 0 } })


  db.products.updateMany(
  { name: "Creamy Choco" },
  { $set: { numReviews: 5 } }
)




  brew services start mongodb-community
  brew services stop mongodb-community
  brew services restart mongodb-community



  in compass :
  mongodb+srv://niharika:<db_password>@cluster1.q1fgmra.mongodb.net/

  in mongosh:
  mongosh "mongodb+srv://cluster1.q1fgmra.mongodb.net/" --apiVersion 1 --username niharika






  https://chocolatey.raspberryip.com/

  http://videohub.raspberryip.com/





  */
