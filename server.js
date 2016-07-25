//list of modules
var express = require('express');
var app = express();
var session=require('express-session');
var http = require('http');
var server = http.createServer(app);
var io=require('socket.io').listen(server);
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var fs=require('fs');

//mongodb connection
//var mongojs= require('mongojs');
// var db = mongojs("sathish",["chat"]);
var mongo=require('mongojs');
var db=mongo('sathish');
var collect = db.collection('chat');
app.use(session({secret:'secrettoken'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());

//get the defalut page
app.get('/',function(req,res){
  res.sendfile('views/home.html')
});

//post the signup page
app.post('/signup',function(req,res){
  var name=req.body.name;
  var email=req.body.email;
  var password=req.body.password;
  var date=req.body.date;
  var gender=req.body.gender;

     // save the data for mongodb
  collect.findOne({name:name},{email:email},function(err,data){
    console.log(data);
    if(data){
      res.send(false);
    }
    else{
      collect.insert({name:name,email:email,password:password,date:date,gender:gender},function(err,data){
        console.log(data);
        req.session.username=req.body.email;
        console.log('dasd',req.session.username);
        res.send(true);
        console.log('data connect is success');
      });
    }
  });
});
app.get('/signup',function(req,res){
	res.sendfile('views/signup.html')
});

//post the login page
app.post('/login',function(req,res){
  var email=req.body.email;
  var password=req.body.password;
  console.log(email);

  // findone data for db
  collect.findOne({email:email,password:password},function(err,data){
    console.log(data);
    if (data){
      // email id stored in session
      req.session.username=req.body.email;
      console.log('dsd',req.session.username);
      res.send(true);
      console.log('sucess');
    }
    else{
       res.send(false);
      console.log('failed',data);
    }
  });
});
app.get('/login',function(req,res){
  
    res.sendfile('views/login.html');
});

app.get('/home',function(req,res){
  if (req.session.username) {
    console.log('homepage:',req.session.username);
    res.sendfile('views/home.html')
  }
  else{
    res.redirect('/')
  }
});  

app.get('/chat',function(req,res){
  if (req.session.username){
    console.log('chatpage:',req.session.username);
    res.sendfile('views/chat.html')
  }
  else{
    res.redirect('/')
  }
});
// user info in server side
app.get('/myinfo',function(req,res){
  console.log('myinfopage:',req.session.username)
  collect.findOne({email:req.session.username},function(err,data){
    console.log(data);
    if(data){
      res.send(data);
    }
    else{
      res.send(false);
    }

  })
})

//socket.io connections
var usernames = {};
io.sockets.on('connection', function (socket) {

  socket.on('sendchat', function (data) {
   
    io.sockets.emit('updatechat', socket.username, data);
    console.log("uaa:",socket.username);
    console.log("sss:",data);
  });

  
  socket.on('adduser', function(username){
    
    socket.username = username;
    
    usernames[username] = socket.id;
    console.log("bba:",usernames);
    
    socket.emit('updatechat', username, 'you have connected');
    
    socket.emit('store_username', username);
    
    socket.broadcast.emit('updatechat',  username ,' has connected ', socket.id);
  
    io.sockets.emit('updateusers', usernames);
  });

  socket.on('disconnect', function(){
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', socket.username ,'has disconnected');
  });
  socket.on('check_user',function(asked,id){
    io.sockets.socket(usernames[asked]).emit('msg_user',check_key(id));
  });

  function check_key(id){
    var val="";
    for(var key in val){
      if(usernames[key]==val)
        val=key;
    }
    return val;
  }
  socket.on('msg_others',function(usr,username,msg){
    io.sockets.socket(usernames[usr]).emit('msg_handler',username,msg);
    fs.writeFile("views/chat.html", msg, function(err) {
      if(err) {
      console.log(err);
      } 
      });

  });
  
  

});

server.listen('8000');
console.log('server is runing:8000');