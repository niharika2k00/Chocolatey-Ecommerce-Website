import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./backend/Models/ProductModels.js";

dotenv.config();

const testDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    const count = await Product.countDocuments();
    console.log(`Total products in database: ${count}`);

    const products = await Product.find({}).limit(3);
    console.log(
      "First 3 products:",
      products.map((p) => ({ name: p.name, price: p.price }))
    );

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
};

testDB();
