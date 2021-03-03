
import express from 'express';
import asyncHandler from 'express-async-handler';
import pro from '../Models/ProductModels.js';

// @desc       Fetch all products
// @Route      GET/api/products
// @access      public


const getproducts = asyncHandler(async (req, res) => {
    const products = await pro.find({});
    /* res.status(401)
   throw new Error("Not AUthorised") */
    // throw new Error("SOME ERROR !"); --- msg/loader
    res.json(products);
})

const getproductByID = asyncHandler(async (req, res) => {
    const product = await pro.findById(req.params.id)
    if (product)
        res.json(product);
    else                                            // err
    {   // res.status(404).json({ message: "Product not found" });
        res.status(404)
        throw new Error("Product not found");
    }
})


export { getproducts, getproductByID };