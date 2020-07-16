console.log("Hmmm Okay");

let create_contact=function(){
     let contactForm= $('#contact-form');
     contactForm.submit(function(e){
         e.preventDefault();
         $.ajax({
            type:"post",
            url:'/createContact',
            data:contactForm.serialize(),
            success:function(data){
                console.log(data);
               let newContact=newcontactItem(data.data);
               console.log(newContact);
               $('#contacts-container').append(newContact);
            },error:function(err){
               console.log("error",err);
            }
        })
        })
}
let newcontactItem=function(contact){
    console.log("contact",contact);
    return $(`<li>
                <span class="name">${contact.name}</span>
                <span class="phoneno">${contact.Mobile_no}</span>
                <span class="delete-bttn"><a href="/deleteContact/?id=${contact._id}"><i class="fa fa-times-circle"></i></a></span> 
              </li>`)
}
create_contact();

