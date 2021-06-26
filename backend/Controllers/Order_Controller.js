
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







// @desc        Get Order by ID
// @Route       GET/api/orders/:id
// @access      private

// Using Order ID
const GetOrderById = asyncHandler(async (req, res) => {

    const Order = await ORDER.findById(req.params.id).populate('user', 'name email');  // reference documents in other collection

    if (Order) {
        res.json(Order);
    }
    else {
        res.status(404)
        throw new Error('Order Not Found');
    }
})






// @desc        Payment Method
// @Route       GET/api/orders/:id/pay
// @access      private

const Update_OrderToPay = asyncHandler(async (req, res) => {
    const Order = await ORDER.findById(req.params.id).populate('user', 'name email');  // reference documents in other collection
    console.log(Order)
    if (Order) {
        Order.isPaid = true;
        Order.paid_at = Date.now();
        Order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_id: req.body.payer.email_id,
            update_time: req.body.update_time
        }

        const UpdatedOrder_forPayment = await Order.save();
        res.json(UpdatedOrder_forPayment);
    }
    else {
        res.status(404)
        throw new Error('Order Not Found');
    }
})







// @desc        Delivery Method
// @Route       GET/api/orders/:id/deliver
// @access      private

const Update_OrderForDeliver = asyncHandler(async (req, res) => {
    const Order = await ORDER.findById(req.params.id);
    console.log(Order)
    if (Order) {
        Order.isDelivered = true;
        Order.Delivered_at = Date.now();

        const UpdatedOrder_forPayment = await Order.save();
        res.json(UpdatedOrder_forPayment);
    }
    else {
        res.status(404)
        throw new Error('Order Not Found');
    }
})






// @desc        All Orders of Logged in user
// @Route       GET/api/orders/myorders
// @access      private

const getAllMyOrders = asyncHandler(async (req, res) => {
    const allMyOrders = await ORDER.find({ user: req.user._id });  // reference documents in other collection
    console.log(allMyOrders)
    res.json(allMyOrders);
})





// @desc        All Orders of all users
// @Route       GET/api/orders
// @access      private

const getOrders = asyncHandler(async (req, res) => {
    const OrdersFull = await ORDER.find({}).populate('user', 'id name');  // reference documents in other collection
    console.log(OrdersFull)
    res.json(OrdersFull);
})




export { AddOrderItems, GetOrderById, Update_OrderToPay, Update_OrderForDeliver, getAllMyOrders, getOrders };
