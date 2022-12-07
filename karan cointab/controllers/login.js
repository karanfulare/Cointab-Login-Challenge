
const { response } = require('express');
const { exists } = require('../model/User');
const User = require ('../model/User');

module.exports.login = function(req,res){
    if(req.cookies.user_id){     
       return res.redirect("/home");               // if user is logged in he can't go to login page unless he logs out 
    }
    res.render('login',{
        title:"Login"
    })
}

module.exports.signup = function(req,res,err){
    if(req.cookies.user_id){
       return res.redirect("/home");             // if user is logged in he can't go to signup page unless he logs out 
    }
   
    res.render('signup',{
        title:"signup"
    })
}

module.exports.create = function(req,res){

   if(req.body.password != req.body.confirm_password){
     return res.redirect('back');
   }

   User.findOne({email: req.body.email}, function(err,user){
    if(err){console.log('Error user exist '); 
    return}

    if(!user){
        User.create(req.body, function(err,user){
            if(err){console.log('Error creating user '); 
            return}
            return res.redirect('/');
        })
    } else {
        return res.redirect('/');
    }
});
}

module.exports.createsession  =  function(req,res,next){
    User.findOne({ email: req.body.email }, function(err, user){
        console.log(req.body);
        let todaydate = Date();
        console.log(todaydate);
        if(err){console.log('error finding user'); return}
        // if user found
        if(user){
            if(user.time > todaydate){
                return res.redirect("/failed");
            }
           // IF PASSWORD DOESN'T MATCH
           if(user.password != req.body.password ){
          // update the login value by one
            User.findOneAndUpdate({email: req.body.email},{$inc:{"login":`1`}},{new:true},(user)=>{
                console.log(user);
            });
            console.log(user.login + " THIS IS FROM DB");
            console.log(user.time);
           // starting a timer of 24 hrs to and reset the login var after  failed attempts
           // last time I used Settimeout but that won't be useful if server goes down
            if(user.login == 4){            
                let PlusTwentyFourHours =new Date(new Date().getTime() + 60 * 60 * 24 * 1000); // CHANGE HERE FOR TESTING 
                User.findOneAndUpdate({email: req.body.email},{$set:{time:PlusTwentyFourHours,"login":0}},{new:true},(result)=>{
                            console.log(result);
                        })
                return res.redirect('/failed');
            }
               return res.redirect('back');
           }
           // allow login only if the value of login var is less than defined attempts(5 here)
         if(user.login < 5 && user.time < todaydate){
            // setting the value of login var 0 if user is successful to login within 5 attempts 
            User.findOneAndUpdate({email: req.body.email},{$set:{"login":0}},(result)=>{
                console.log(result);
            })
            console.log(user.login+" user login var value");
           res.cookie('user_id', user.id);
           return res.redirect('/home');
           }
           else{
            return res.redirect('/');
           }
        }
        else{
            return res.redirect('back');
        }
    });
}