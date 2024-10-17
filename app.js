const express = require("express");
const bodyParser = require("body-parser");
const qr = require("qr-image");  
const fs = require("fs");
const port = 3000;

// npm package

const app = express();

// middlewares 

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});


app.post("/",function(req,res){
    var name = req.body.name;
    var URL = req.body.URL;

    var qr_svg = qr.image(URL);
    qr_svg.pipe(fs.createWriteStream(__dirname + `/${name}.png`));

    setTimeout(() => {
        res.sendFile(__dirname + `/${name}.png`);
    }, 2000);
      
})

app.listen(port,function(){
    console.log(`Server Active at port ${port}`);
});