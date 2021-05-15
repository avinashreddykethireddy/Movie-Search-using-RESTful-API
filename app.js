var express = require('express');
var app = express();
var path = require('path');


app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",function(req,res){
    res.render("home");
});


// app.listen(process.env.PORT,process.env.IP);

// to run in your local machine
app.listen(3000,function(){
    console.log("Movie app Server started! http://localhost:3000/");
});