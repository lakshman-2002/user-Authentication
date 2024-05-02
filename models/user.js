const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwtToken');
const schema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  mobile:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  createdAt:{
    type : Date,
    default : ()=> new Date()
  },
  updatedAt:{
    type : Date,
    default : ()=> new Date()
  },
  isActive: {
    type:Boolean,
    default:true
  }
});
schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
      next()
  }

  this.password = await bcrypt.hash(this.password, 10)
});

schema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

schema.methods.getJwtToken = () =>{
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
  });
}

module.exports = mongoose.model('User',schema);