const User = require('../model/User');


module.exports.home = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
             if(user){
                    res.render('home',{
                     title :"Home",
                     user:user});
                     } 
            });
         }
      else{return res.redirect('/'); }
}

module.exports.logout = function(req,res){
    res.clearCookie('user_id');
    return res.status(200).redirect('/');
}