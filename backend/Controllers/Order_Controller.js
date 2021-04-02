
import express from 'express';
import asyncHandler from 'express-async-handler';
import ORDER from '../Models/OrderModels.js';



// @desc       Create New Orders
// @Route      POST/api/orders
// @access      private

const AddOrderItems = asyncHandler(async (req, res) => {   // Fetch all 6 products from the backend

    const { cartItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;

    if (cartItems && cartItems.length === 0) {
        res.send(400)
        throw new Error('NO Ordered Items')
    }

    else {                                   // for creating NEW ORDER in the DataBase
        const Order = new ORDER({
            user: req.user._id,
            cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const CreateOrder = await Order.save();            // to save in the DB
        res.status(201).json(CreateOrder);
    }


})

export {AddOrderItems} ;
