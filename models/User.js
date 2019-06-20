const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({  
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
    //not required but just the current date
  }
});


const User = mongoose.model('User', UserSchema)
//pass in model name, which is User, and User Scheme