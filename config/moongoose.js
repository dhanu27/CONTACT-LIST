// import mongoose ODM
const mongoose=require('mongoose');
//Make Connect with database
mongoose.connect('mongodb://localhost/contact_list_db');

const db=mongoose.connection;

// For Checking setup 
db.on('error',console.error.bind(console,'connection erro:'));
db.once('open',function(){
  console.log("SuccessFully set up");
});



