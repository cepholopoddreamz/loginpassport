const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({  
  name: {
    type: String,
    required: true
  },
  email: {
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

module.exports = User;
//I FOrGOT TO EXport this. user wasn't a function because user was undefined -- bc User wasn't exported. 