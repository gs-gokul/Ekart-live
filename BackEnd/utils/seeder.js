const products = require('../Data/products.json');
const product = require('../models/productmodel');
const dotenv = require('dotenv');
const database = require('../config/database');
const connectDatabase = require('../config/database');

dotenv.config({path:'backend/config/config.env'});
connectDatabase();

const seedProducts = async()=>{
  try{
  await product.deleteMany();
  console.log('products are deleted!');
  await product.insertMany(products);
  console.log('All products are added');
  }catch(error){
    console.log(error.message);
  }
  process.exit();//stop the program
}

seedProducts();