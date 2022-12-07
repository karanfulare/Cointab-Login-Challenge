const express = require('express');
const router = express.Router();


const homeController = require("./controllers/home");
const loginController = require("./controllers/login");

router.get('/',loginController.login);
router.get('/signup',loginController.signup);     // show signup page
router.post('/create',loginController.create);    // signup a user
router.post('/createsession',loginController.createsession);   // signin a user
router.get('/home',homeController.home);
router.post('/logout',homeController.logout);

router.get('/failed',(req,res)=>{
    res.render('failed',{
        title:"Failed"
       });
});


module.exports = router;