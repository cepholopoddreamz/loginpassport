const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({  
  name: {
    type: String,
    required: True
  },
  password: {
    type: String,
    required: True
  },
  date: {
    type: Date,
    default: Date.now
    //not required but just the current date
  }
});


const User = mongoose.model('User', UserSchema)
//pass in model name, which is User, and User Scheme