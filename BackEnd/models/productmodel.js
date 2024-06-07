const mongoose = require("mongoose");

//creating model
const productSchema = new mongoose.Schema({
  name : {
    type: String,
    required: [true, "Please Enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"]
  },
  price: {
    type: Number,
    required: true,
    //default: 0.0
  },
  description: {
    type: String,
    required: [true, "please enter product description"],

  },
  ratings: {
    type: String,
    default: 0
  },
  images: [{ //more images so we declare as array
    image:{
      type: String,
      required: true
    }
  }],
  category: {
    type: String,
    required: [true,"Please enter product category"],
    enum: { //It is used to control allowed category
      values: [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'HeadPhones',
        'Home'
      ]
    },
    message : "please select correct category"
  },
  seller: {
    type: String,
    required: [true,"Please enter product seller"]
  },
  stock: {
    type: Number,
    required: [true,"Please enter product stock"],
    maxLength: [20, "Product stock cannot exceed 20"]
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

})

let Schema = mongoose.model('product', productSchema)

module.exports = Schema;