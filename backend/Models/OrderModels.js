import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // connection to the user.This connects the product and the user.Reference to the User.
    },

    // [{} {} {}]
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        filling: { type: String },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      email_id: { type: String },
      update_time: { type: String },
    },

    taxPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },

    shipping_price: {
      type: Number,
      default: 0.0,
      required: true,
    },

    total_price: {
      type: Number,
      default: 0.0,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },

    paid_at: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      default: false,
      required: true,
    },

    Delivered_at: {
      type: Date,
    },
  },
  { timestamps: true }
); // 2nd arguement

const Order = mongoose.model("Order", OrderSchema);
export default Order;
