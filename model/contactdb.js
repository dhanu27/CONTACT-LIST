// only one instance made whether import many times
const mongoose=require('mongoose');
// for creating Schema
var ContactSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Mobile_no:{
        type:String,
        required:true
    }
});
// for  making model of a schema 
const Contact=mongoose.model('ContactModel',ContactSchema);
// For export
module.exports=Contact;