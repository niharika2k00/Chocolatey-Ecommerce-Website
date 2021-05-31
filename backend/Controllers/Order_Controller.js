
import express from 'express';
import asyncHandler from 'express-async-handler';
import ORDER from '../Models/OrderModels.js';





// @desc       Create New Orders
// @Route      POST/api/orders
// @access      private

const AddOrderItems = asyncHandler(async (req, res) => {

    // VARIABLES SAME AS THAT OF THE MODEL
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shipping_price, taxPrice, total_price } = req.body;
    console.log(req.user)

    if (orderItems && orderItems.length === 0) {
        res.send(400)
        throw new Error('NO Ordered Items')
    }

    else {
        //creating a new order by making an object{} Order of the class ORDER.
        const Order = new ORDER({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shipping_price,
            taxPrice,
            total_price
        })

        const CreateOrder = await Order.save();            // to Save/Create in the DB
        res.status(201).json(CreateOrder);
    }
})








// @desc       Get Order by ID
// @Route       GET/api/orders/:id
// @access      private

// Using Order ID
const GetOrderById = asyncHandler(async (req, res) => {

    const Order = await ORDER.findById(req.params.id).populate('user', 'name email');

    if (Order) {
        res.json(Order);
    }
    else {
        res.status(404)
        throw new Error('Order Not Found');
    }
})





export { AddOrderItems, GetOrderById };
