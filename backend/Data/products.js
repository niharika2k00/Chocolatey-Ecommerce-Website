
const products = [
  {
    // _id: '1',
    name: 'Creamy Choco',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628188830/Ecommerce_Chocolatey/prod2_gzdarw.jpg',
    brand: 'Galaxy',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 3.5,
    numReviews: 0,
    price: 100,
    countInStock: 10,
    topic: "Mother's Day",
    bestSelling: "Best Selling"
  },

  {
    // _id: '2',
    name: 'Little Choco Hearts',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628189017/Ecommerce_Chocolatey/heart_k4g8y3.jpg',
    brand: 'Apple',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 4.0,
    numReviews: 0,
    price: 240,
    countInStock: 7,
    topic: "Valentines Day",
    bestSelling: "NO"
  },

  {
    // _id: '03',
    name: 'Choco Lattee',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628189036/Ecommerce_Chocolatey/prod3_bjgl6i.webp',
    brand: 'Lattee',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 4,
    numReviews: 0,
    price: 350,
    countInStock: 6,
    topic: "general",
    bestSelling: "Best Selling"
  },

  {
    // _id: '4',
    name: 'Nuts & Caramel Truffles',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628189041/Ecommerce_Chocolatey/prod4_yozi0o.jpg',
    brand: 'Nutilics',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 5,
    numReviews: 0,
    price: 150,
    countInStock: 11,
    topic: "Christmas Special",
    bestSelling: "NO"
  },
  {
    // _id: '5',
    name: 'Bournville Dark Chocolate',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628188976/Ecommerce_Chocolatey/bournville2_nfe6zd.jpg',
    brand: 'Bournville',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 3.5,
    numReviews: 0,
    price: 200,
    countInStock: 7,
    topic: "general",
    bestSelling: "NO"
  },

  {
    // _id: '06',
    name: 'Bunny Cake',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628189053/Ecommerce_Chocolatey/bunny_uitpca.jpg',
    brand: 'Lattee',
    catagory: 'Cup Cakes',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 3,
    numReviews: 0,
    price: 80,
    countInStock: 4,
    topic: "Cup Cakes",
    bestSelling: "Best Selling"
  },

  {
    // _id: '7',
    name: 'Gift Pack',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628189029/Ecommerce_Chocolatey/prod1_duivnz.jpg',
    brand: 'Gifty',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 4,
    numReviews: 0,
    price: 690,
    countInStock: 18,
    topic: "Gift Boxes",
    bestSelling: "NO"
  },

  {
    // _id: '08',
    name: 'Ferrero Rocher Gold',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628189001/Ecommerce_Chocolatey/ferrero-rocher_qpqupj.png',
    brand: 'Ferrero Rocher',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 2.5,
    numReviews: 0,
    price: 210,
    countInStock: 0,
    topic: "Mother's Day",
    bestSelling: "NO"
  },

  {
    // _id: '09',
    name: 'Amul Dark Chocolate',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628188996/Ecommerce_Chocolatey/dairymilk_eo1ce5.jpg',
    brand: 'Amul',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 4,
    numReviews: 0,
    price: 120,
    countInStock: 12,
    topic: "general",
    bestSelling: "NO"
  },

  {
    // _id: '10',
    name: 'Heart Cake',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628189043/Ecommerce_Chocolatey/valentine45_gysmxo.jpg',
    brand: 'Lattee',
    catagory: 'Cup Cakes',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 4.5,
    numReviews: 0,
    price: 150,
    countInStock: 4,
    topic: "Valentines Day",
    bestSelling: "Best Selling"
  },

  {
    // _id: '11',
    name: 'Choco Chef Fantasy',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628189336/Ecommerce_Chocolatey/choco4_lsfw4n.png',
    brand: 'Fantasy World',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 2.5,
    numReviews: 0,
    price: 320,
    countInStock: 5,
    topic: "Christmas Special",
    bestSelling: "NO"
  },

  {
    // _id: '12',
    name: 'Bournville Cranberry',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628188816/Ecommerce_Chocolatey/bournville_bfebpu.webp',
    brand: 'Bournville',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 2,
    numReviews: 0,
    price: 200,
    countInStock: 6,
    topic: "general",
    bestSelling: "NO"
  },


  {
    // _id: '13',
    name: 'Brownie',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628188995/Ecommerce_Chocolatey/brownies_a2gtxg.jpg',
    brand: 'Pillsbury ',
    catagory: 'Brownie',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 2.5,
    numReviews: 0,
    price: 99,
    countInStock: 6,
    topic: "Brownies",
    bestSelling: "NO"
  },

  {
    // _id: '14',
    name: 'Gift for Her',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628189026/Ecommerce_Chocolatey/pinkBox_dedqss.jpg',
    brand: 'Gifty',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 2.5,
    numReviews: 0,
    price: 210,
    countInStock: 3,
    topic: "Gift Boxes",
    bestSelling: "Best Selling"
  },


  {
    // _id: '15',
    name: 'Dairy Milk',
    image: 'https://res.cloudinary.com/doc0bmmew/image/upload/v1628188998/Ecommerce_Chocolatey/Dmilk_js3a3x.jpg',
    brand: 'Dairy Milk',
    catagory: 'Chocolate',
    description: 'Chocolate is a made from Cocoa Beans.It can be in a solid form like a candy bar or it can be in a liquid form like hot chocolate. Commercial chocolate has sugar and sometimes milk added. Dark chocolate has less sugar, and a more bitter taste. It was originally used to make drinking chocolate.',
    rating: 4,
    numReviews: 0,
    price: 145,
    countInStock: 18,
    topic: "general",
    bestSelling: "NO"
  },
]

// module.exports = products
export default products;
