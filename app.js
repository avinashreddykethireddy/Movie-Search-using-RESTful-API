var express = require('express');
var app = express();
var path = require('path');
var request = require('request');

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
    res.render("home");
});
app.get("/result",function(req,res){
    //console.log(req.query.movie_name);
    var query = req.query.movie_name;
    var html_link = "http://www.omdbapi.com/?s="+query+"&apikey=a9de43cc"; 
    request(html_link,function(error,response,body){
        if(!error && response.statusCode == 200){
            
            var parsedData = JSON.parse(body);
            console.log(parsedData);
            if(parsedData['Response'] === "False"){
                res.render("nopage");
            }
            else{        
                res.render("result",{parsedData:parsedData});
            }
        }
    });
});

app.get("/moreinfo",function(req,res){
    var query = req.query.imdbID;
    var html_link = "http://www.omdbapi.com/?i="+query+"&apikey=a9de43cc"; 
    request(html_link,function(error,response,body){
        if(!error && response.statusCode == 200){
            
            var parsedData = JSON.parse(body);
            console.log(parsedData);
            if(parsedData['Response'] === "False"){
                res.render("nopage");
            }
            else{        
                res.render("moreinfo",{parsedData:parsedData});
            }
        }
    });
});



app.listen(process.env.PORT,process.env.IP);

// to run in your local machine
// app.listen(3000,function(){
//     console.log("Movie app Server started! http://localhost:3000/");
// });