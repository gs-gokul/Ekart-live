const catchAsyncError = require('../middlewares/catchAsyncError');
const Order = require('../models/orderModel');
const Product = require('../models/productmodel')
const ErrorHandler = require('../utils/errorHandler');
//import Order from "../models/orderModel"


//Create new Order - api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next)=>{
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
  } = req.body;
  
  
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id
  })

  res.status(200).json({
    success: true,
    order
  })
})

//Get Single Order - api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req,res,next)=>{
 const order = await Order.findById(req.params.id).populate('user','name email')
 if(!order){
  return next(new ErrorHandler(`Order not found with this ID : ${req.params.id}`,404))
 }

  res.status(200).json({
    success: true,
    order
  })

})

//Get loggedin User orders - api/v1/myorders
exports.myOrders = catchAsyncError(async (req,res,next)=>{
const orders = await Order.find({user: req.user.id})
  if(!orders){
   return next(new ErrorHandler(`Order not found with this ID : ${req.user.id}`,404))
  }

  res.status(200).json({
    success: true,
    orders
  })
})

//Admin: Get all Orders - api/v1/orders
exports.orders = catchAsyncError(async (req,res,next)=>{
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach(order=>{
    totalAmount += order.totalPrice;
  }) 

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  })
})

//Admin: update Order or Order Status - api/v1/order/:ID
exports.updateOrder = catchAsyncError(async (req, res, next)=>{
  const order = await Order.findById(req.params.id);

  if(order.orderStatus == 'Delivered'){
    return next(new ErrorHandler('Order has been already Delivered', 400))
  }

  //updating the product stock of each order item
  order.orderItems.forEach(async orderItem => {
    await updateStock(orderItem.product, orderItem.quantity)
  })

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({
    success: true
  })

})

async function updateStock(productId, quantity){
  const product = await Product.findById(productId);
  product.stock = product.stock - quantity;
  product.save({validateBeforeSave: false})
}

//Admin: Delete Order - api/v1/order/:id
exports.deleteOrder = catchAsyncError( async (req, res, next)=>{
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHandler(`Order not found with this ID : ${req.user.id}`,404))
   }

  await order.deleteOne();
  res.status(200).json({
    success: true
  })
})