const http=require('http');
const port=8002;
const express=require('express');
const path=require('path');

const db=require('./config/moongoose');
const UserSchema=require('./model/contactdb');
const Contact=require('./model/contactdb'); 

const app=express();
app.use(express.urlencoded());
app.use(express.static('assets'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));
  let createContact=async function(req,res){
    // contactlist.push(req.body);
       try{ 
        let contact= await Contact.create({ name:req.body.name,Mobile_no:req.body.Mobile_no});
        if(req.xhr){
            return res.status(200).json({
                data:contact
            });
            console.log(contact);  
        } 
      }catch(err){
          console.log("Error",err);
          return ;
      }
  } 
    app.get('/',function(req,res){
        console.log(__dirname);
         Contact.find({},function(err,Contactdata){
             if(err){
                 return ;
             }
             return res.render('home',{
                title:'My Contact List',
                contact_list:Contactdata
            });
         });
    }); 
    app.post('/createContact',createContact);
   app.get('/deleteContact',function(req,res){
    //    console.log(req.query);
       let id=req.query.id;
       Contact.findByIdAndDelete(id,function(err){
           if(err){
               return;
           }
           res.redirect('/');  
       })
   });
   app.get('/searchContact',function(req,res){
         console.log(req.query.tosearch);
         let tosearch= new RegExp(req.query.tosearch, 'i');
         Contact.find({name:tosearch},function(err,Contactdata){
             if(err){
                 console.log("Not found");
                 return ;
             }
             console.log(Contactdata);
            return res.render('home',{
                title:'My Contact List',
                contact_list:Contactdata
             });
         });
   });

    app.listen(port,function(err){
        if(err)
        {
            console.log("Not to worry Try Again");
            return ;
        }
        console.log("Ok Move on");
    });