const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: [true, 'Enter your Name']
  },
  email : {
    type: String,
    required: [true, 'Enter your Email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter valid Email Address']
  },
  password: {
    type: String,
    required: [true, 'Enter your Password'],
    maxLength: [8,'Password cannot exceed 8 characters'],
    select: false
  },
  avatar: {
    //user profile picture
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordTokenExpire: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', async function(next){
  //hashing
  if(!this.isModified('password'))
    next();
  this.password = await bcrypt.hash(this.password, 10)
})

//creating token for each user
userSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  })
}

userSchema.methods.isValidPassword = async function(enteredPassword){
  return bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function(){
  //Generate Token
  const token = crypto.randomBytes(20).toString('hex'/*Encoding at hexa decimal*/); //It creates a random buffer data(some type of digital data)

  //Generate Hash and resetPasswordToken
  this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

  //set token expire Time
  this.resetPasswordTokenExpire = Date.now() + 30*60*1000;

  return token
}

let model = mongoose.model('User', userSchema);

module.exports = model;