const express=require('express');
const cookieParser = require('cookie-parser');
const app =express();
const port =8000;
const path = require("path");
const db = require('./model/config');
const bodyParser = require('body-parser');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.use('/',require('./routes'));
app.listen(port,(err)=>{
if(err){
    console.log("Error in starting the SERVER" + err)
}
else {
    console.log(`Server Started and running on ${port}`);
}
})