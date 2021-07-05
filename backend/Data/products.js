
const products = [
  {
    // _id: '1',
    name: 'Creamy Choco',
    image: 'https://st2.depositphotos.com/4278641/6348/i/600/depositphotos_63486511-stock-photo-sweet-chocolates-background.jpg',
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
    image: 'https://us.123rf.com/450wm/karandaev/karandaev1801/karandaev180100079/93066020-valentines-day-greeting-card-with-heart-chocolate-box-on-wooden-table-top-view.jpg?ver=6',
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
    image: 'https://cdn.dribbble.com/users/2214836/screenshots/14254786/media/226b6b55ee28d0ca27bd65621b6676ee.jpg',
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
    image: 'https://images.unsplash.com/photo-1610230285329-a8f410716d3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNob2NvbGF0ZXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
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
    image: 'https://images-na.ssl-images-amazon.com/images/I/816AEzIJYyL._SX569_.jpg',
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
    image: 'https://i.pinimg.com/564x/68/83/ec/6883ec9ed5e94ae4226cdeecbed46599.jpg',
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
    image: 'https://4.imimg.com/data4/NH/DL/MY-27356866/chocolate-gift-box-500x500.jpg',
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
    image: 'https://www.disko-agency.com/wp-content/uploads/2016/01/ferrero-rocher.png',
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
    image: 'https://www.kolkataonlineflorists.com/images/CHCSUUN429_big.jpg',
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
    image: 'https://www.karachibakery.com/images/valentine2021/big/valentine45.jpg',
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
    image: 'http://crems.like-themes.com/wp-content/uploads/2019/06/shop-04-768x768.png',
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
    image: 'https://cdn.igp.com/f_auto,q_auto,t_prodm/products/p-cadbury-bournville-cranberry-80g-110158-m.jpg',
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
    image: 'https://pixelz.cc/wp-content/uploads/2018/12/chocolate-brownies-uhd-4k-wallpaper.jpg',
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
    image: 'https://images-na.ssl-images-amazon.com/images/I/71u8QnmRzXL._SL1500_.jpg',
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
    image: 'https://wallpaperaccess.com/full/3518159.jpg',
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
