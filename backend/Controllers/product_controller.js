
import express from 'express';
import asyncHandler from 'express-async-handler';
import PRODUCT from '../Models/ProductModels.js';



// @desc       Fetch all products
// @Route      GET/api/products
// @access      public

const getproducts = asyncHandler(async (req, res) => {   // Fetch all 6 products from the backend
    const products = await PRODUCT.find({});
    /* res.status(401)
   throw new Error("Not AUthorised") */
    // throw new Error("SOME ERROR !"); --- msg/loader
    res.json(products);
})





// @desc       Fetch Single Product by ID
// @Route      GET/api/products/:id
// @access      public

const getproductByID = asyncHandler(async (req, res) => {
    const product = await PRODUCT.findById(req.params.id)
    if (product)
        res.json(product);
    else {   // res.status(404).json({ message: "Product not found" });
        res.status(404)
        throw new Error("Product not found");
    }
})






// @desc       Delete a Product by ID
// @Route      DEL/api/products/:id
// @access     Private / for ADMIN ONLY

const deleteProductByID = asyncHandler(async (req, res) => {
    const prod = await PRODUCT.findById(req.params.id);
    if (prod) {
        await prod.remove();
        res.json({ message: "Product Deleted !" });
    }
    else {                                            // res.status(404).json({ message: "Product not found" });
        res.status(404)
        throw new Error("Product not found");
    }
})






// @desc       Create Product
// @Route      POST/api/products
// @access     Private / for ADMIN ONLY

const createProduct = asyncHandler(async (req, res) => {

    const newProduct = new PRODUCT({
        name: "sample name",
        user: req.user._id,
        price: 0,
        image: "image.jpg",
        topic: "general",
        brand: "XYZ",
        catagory: "Chocolate",
        countInStock: 0,
        numReviews: 0,
        description: "sample description ..."
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
})







// @desc       Update Product by ID
// @Route      PUT/api/products/:id
// @access     Private / for ADMIN ONLY

const updatedProduct = asyncHandler(async (req, res) => {

    const { name, price, image, description, brand, topic, catagory, /* numReviews, */ countInStock } = req.body;  // updates values that the user has put
    const product = await PRODUCT.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.image = image;
        product.topic = topic;
        product.description = description;
        product.brand = brand;
        product.catagory = catagory;
        // product.numReviews = numReviews;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    else {                                            // res.status(404).json({ message: "Product not found" });
        res.status(404)
        throw new Error("Product not found");
    }
})






// @desc       Create NEW User Reviews by ID
// @Route      PUT/api/products/:id
// @access     Public

const createUserReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;  // updates values that the user has put
    const product = await PRODUCT.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('You have already reviewed the product')
        }

        const Review = {
            name: req.user.name,
            user: req.user._id,
            rating: Number(rating),
            comment,
        }

        // "reviews": [] an array initaily
        product.reviews.push(Review);
        product.numReviews = product.reviews.length;
        // console.log(product.reviews.length)
        product.rating = (product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length);

        await product.save()
        res.status(201).json({ message: 'Review added success' })
    }
    else {                                            // res.status(404).json({ message: "Product not found" });
        res.status(404)
        throw new Error("Product not found");
    }
})







export { getproducts, getproductByID, deleteProductByID, createProduct, updatedProduct, createUserReview };