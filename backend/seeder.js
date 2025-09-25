// ------------------------------------------------------------------------------------------------
// This file is used to import sample products and users data into the database
// Note: The product images are uploaded to cloudinary and their links are stored in the database. Raw images are present in product_images directory.
// ------------------------------------------------------------------------------------------------

import mongoose from "mongoose";
import userData from "./Data/users.js";
import productData from "./Data/products.js";
import dotenv from "dotenv";
import User from "./Models/UserModels.js";
import Order from "./Models/OrderModels.js";
import Product from "./Models/ProductModels.js";
import ConnectDB from "./config/DB.js";

dotenv.config();
ConnectDB();

// async-await bcz we are fetching data frm the database so everything will return a promise
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUserArray = await User.insertMany(userData); // It's an array of all the users fetched from our sample data
    const adminUser = createdUserArray[0]._id;
    // console.log(adminUser);
    const sampleProductArray = productData.map((product) => {
      return { ...product, user: adminUser }; // ...products includes all the stuffs of the product with addition to the adminUser field
    });

    await Product.insertMany(sampleProductArray); // insert the final data with the admin field
    console.log("Data imported successfully".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Delete All
const destroyData = async () => {
  // async bcz it we are fetching data frm the database so everything returns a promise
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("DATA DESTROYED !!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
