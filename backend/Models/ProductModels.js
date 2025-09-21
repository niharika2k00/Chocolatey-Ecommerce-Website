import mongoose from "mongoose";

// REVIEW SCHEMA OR THE REVIEW MODEL
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // from the usermodule.js
    },
  },
  { timestamps: true }
);

const ProductSchema = mongoose.Schema(
  {
    // CREATING SCHEMA AND MODELS
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User", // connection to the user. This connects the product and the user
    },

    name: {
      type: String, // required: true
      default: 0,
    },

    image: {
      type: String,
    },

    brand: {
      type: String,
    },

    topic: {
      type: String,
    },

    catagory: {
      type: String,
    },

    bestSelling: {
      type: String,
    },

    description: {
      type: String, // required: true,
      default: 0,
    },

    reviews: [reviewSchema], // array of review obj
    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
); // 2nd arguement

const Product = mongoose.model("Product", ProductSchema);
export default Product;
