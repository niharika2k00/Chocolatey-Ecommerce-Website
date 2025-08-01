// Import sample data ---- into the DATABASE
import mongoose from "mongoose";
import userData from "./Data/users.js";
import productData from "./Data/products.js";
import dotenv from "dotenv";
import User from "./Models/UserModels.js";
import Order from "./Models/OrderModels.js";
import Product from "./Models/ProductModels.js";
import ConnectDB from "./config/DB.js";
import colors from "colors";

dotenv.config();
ConnectDB();

// async-await bcz we are fetching data frm the database so everything will RETURN A PROMISE
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(userData); // It's an array of all the users fetched from our sample data
    const adminUser = createdUsers[0]._id;
    // console.log(adminUser);
    const sampleProducts = productData.map((product) => {
      return { ...product, user: adminUser }; // ...products includes all the stuffs of the product with addition to the adminUser field
    });

    await Product.insertMany(sampleProducts); // insert the final data with the admin field
    console.log("DATA IMPORTED".green.inverse);
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
