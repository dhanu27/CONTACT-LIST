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

    var contactlist=[
        {
            name:"dhanu",
            Moblie_no:"1111111"
        },
        {
            name:"Radhe",
            Moblie_no:"2222222222"
        },
        {
            name:"Shyam",
            Moblie_no:"99999999"
        }
    ]
    app.get('/',function(req,res){
        console.log(__dirname);
         Contact.find({},function(err,Contactdata){
             if(err){
                 console.log("WTF");
                 return ;
             }
            //  console.log(Contactdata);
             return res.render('home',{
                title:'My Contact List',
                contact_list:Contactdata
            });
         });
        // res.send("<h1>Ohh  Yes</h1>");
    }); 
    app.post('/createContact',function(req,res){
    // contactlist.push(req.body);
    Contact.create({
        name:req.body.name,
        Moblie_no:req.body.Moblie_no
    },function(err,ContactData){
        if(err){
            console.log("WTF");
        }
        console.log(ContactData);
    });

        return res.redirect('/');
    });
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
         Contact.find({name:req.query.tosearch},function(err,Contactdata){
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