const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.post('/',function(req,res){
    // console.log(req.body.crypto);
    // console.log(req.body.currency);

    var crypto=req.body.crypto;
    var fiat=req.body.fiat;
    

    var baseUrl="https://apiv2.bitcoinaverage.com/indices/global/ticker/";

    var finalUrl=baseUrl+crypto+fiat;


    request(finalUrl,function(error,response,body){
        // console.log(body);

        var data=JSON.parse(body);
        var price=data.last;

        // console.log(price);
        res.send("The current price of "+crypto+" is "+price+" "+ fiat);
    })


})



app.listen(3000,function(){
    console.log("Server is hosted on port :3000");
})