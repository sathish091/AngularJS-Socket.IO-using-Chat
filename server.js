//list of modules
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io=require('socket.io').listen(server);
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser')
//mongodb connection
//var mongojs= require('mongojs');
// var db = mongojs("sathish",["chat"]);
  var mongo=require('mongojs');
  var db=mongo('sathish');
  var collect = db.collection('chat');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());
//get the defalut page
app.get('/',function(req,res)
{
	res.sendfile('views/home.html')
});
//post the signup page
app.post('/signup',function(req,res)
{
     var name=req.body.name;
     var email=req.body.email;
     var password=req.body.password;
     var date=req.body.date;
     var gender=req.body.gender;


     // save the data for mongodb
     collect.save({name:name,email:email,password:password,date:date,gender:gender},function(err,data)
     { 
     	
          if(!err)
     	{console.log(data);
     		res.sendfile('views/chat.html')
     		console.log('data connect is success');
     	} else
     	    {
     		 console.log('data is not connect:',err);
     	     }
     });
});

app.get('/signup',function(req,res)
{
	res.sendfile('views/signup.html')
});
//post the login page
app.post('/login',function(req,res)
{
     var email=req.body.email;
     var password=req.body.password;
console.log(email);


     collect.findOne({email:email,password:password},function(err,data)
          {
            console.log(data)

               if (data)
                {
                    res.sendfile('views/chat.html');
                    console.log('sucess');
                }  else
                     {
                       console.log('failed',data);  
                     }
          });

});
app.get('/login',function(req,res)
     {
          res.sendfile('views/login.html')
     });

app.get('/home',function(req,res)
{
    res.sendfile('views/home.html')

});
app.get('/chat',function(req,res)
    {
        res.sendfile('views/chat.html')
    });




server.listen('8000');
console.log('server is runing:8000');