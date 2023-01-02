
var express = require('express');
var path = require('path');
var fs = require('fs');
const { create } = require('domain');
var app = express();
var alert =require('alert');
var session = require('express-session');
const req = require('express/lib/request');
var innerHTML=require('innerhtml');
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017'
//const {render}=require('ejs');
//const {ftruncate}=require('fs');
MongoClient.connect(url,function(err,client){
  if (err) throw err;
  var db = client.db('myDB')
});
const PORT = process.env.PORT || 3030;

// login page
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('login',{title:"express"})
});
app.get('/annapurna',function(req,res){
  if(req.session.log){
    res.render('annapurna',{title:"express"})
  }
    else{
      res.redirect("/");
      alert ("you hav to login first");
    }
});
app.get('/home',function(req,res){
  if(req.session.log==true){
  res.render('home',{title:"express"})
}
  else{
    res.redirect("/");
   
  }
});
app.get('/bali',function(req,res){
  if(req.session.log==true){
    res.render('bali',{title:"express"})
  }
    else{
      res.redirect("/");
     
    }
});
app.get('/cities',function(req,res){
  if(req.session.log==true){
    res.render('cities',{title:"express"})
  }
    else{
      res.redirect("/");
    }
});
app.get('/hiking',function(req,res){
  if(req.session.log==true){
    res.render('hiking',{title:"express"})
  }
    else{
      res.redirect("/");
    }
});
app.get('/inca',function(req,res){
  if(req.session.log==true){
    res.render('inca',{title:"express"})
  }
    else{
      res.redirect("/");
    }
});
app.get('/islands',function(req,res){
  if(req.session.log==true){
    res.render('islands',{title:"express"})
  }
    else{
      res.redirect("/");
    }
});
app.get('/paris',function(req,res){
  if(req.session.log==true){
    res.render('paris',{title:"express"})
  }
    else{
      res.redirect("/");
    }
});
app.get('/registration',function(req,res){
  res.render('registration',{title:"express"})
});
app.get('/rome',function(req,res){
  if(req.session.log==true){
    res.render('rome',{title:"express"})
  }
    else{
      res.redirect("/");
    }
});
app.get('/santorini',function(req,res){
  if(req.session.log==true){
    res.render('santorini',{title:"express"})
  }
    else{
      res.redirect("/");
    }
});
app.get('/searchresults',function(req,res){
  if(req.session.log==true){
    res.render('searchresults',{title:"express"})
  }
    else{
      res.redirect("/");
    }
});
app.get('/wanttogo',function(req,res){
  if(req.session.log==true){
    res.render('wanttogo',{title:"express"})
  }
    else{
      res.redirect("/");
    }
});

MongoClient.connect(url,function(err,client){
  if (err)throw err;
  var db=client.db('myDB');
  const collect=db.collection("myCollection");
collect.find().toArray((err, results) => {
  console.log(results)
});
});
app.post('/',(req,res)=>{
  const username1 =req.body.username;
  const password1=req.body.pass;
    if(username1==='admin'&& password1==='admin'){
      res.render('home');
    }
    else{
  MongoClient.connect(url,function(err,client){
    if (err)throw err;
    var db=client.db('myDB');
    const collect=db.collection("myCollection");
    collect.findOne({username:username1,password:password1},function(err,foundUser){
       if (err){
          console.log (err);
       }else if (foundUser){
           session=req.session;
           session.username=username1;
           session.log=true;
           list=foundUser.MywantToGo;
          
             res.redirect("/home");
       }
       else {
        alert( "Username or the password is incorrect");
        res.render('login');
       }
       
    });
  });}
  });
 
  app.post('/registration',(req,res)=>{
    const x =req.body.username;
    const y =req.body.password;
    if(x=="" || y==""){
      res.redirect("/registration");
     alert("can not leave any of thetext boxes empty")
    }
    else{
    MongoClient.connect(url,function(err,client){
      if (err)throw err;
    var db=client.db('myDB');
    const collect=db.collection("myCollection");
    collect.findOne({username:x},function(err,foundUser){
      if (err){
        console.log (err);}
     else if(foundUser){
    alert("this user already exists")
     res.render('registration')
    }
     else {
      const arr = [];
      collect.insertOne({username:x ,password:y,MywantToGo:arr}, (err, foundUser) => {
      });
      session=req.session;
           session.username=x;
           session.log=true;
      res.redirect("/");
     }
  });
  })};
  });
  app.post('/inca',(req,res)=>{
    MongoClient.connect(url,function(err,client){
      if (err)throw err;
    var db=client.db('myDB');
    const collect=db.collection("myCollection");
    collect.findOne({username:req.session.username},function(err,foundUser){
      if (err){
        console.log (err);}
     else if(foundUser){
      list= foundUser.MywantToGo;
      var flag = true;
      for(var i =0;i<list.length;i++)
      {
        if(list[i]=='inca')
        {
          flag= false;
        }
      
      }
      if (flag){
      list.push('inca')
      collect.updateOne(
        { username: req.session.username }, 
        { $set: { MywantToGo: list } }, 
        (err, result) => {
      })
      res.render('wanttogo',{list})}
      
      else if (flag==false)
      {
        res.redirect('/inca');
        alert("You aleady added it in the list");
      }}
     });
    });
  });
  app.post('/rome',(req,res)=>{
    MongoClient.connect(url,function(err,client){
      if (err)throw err;
    var db=client.db('myDB');
    const collect=db.collection("myCollection");
    collect.findOne({username:req.session.username},function(err,foundUser){
      if (err){
        console.log (err);}
     else if(foundUser){
      list= foundUser.MywantToGo;
      var flag = true;
      for(var i =0;i<list.length;i++)
      {
        if(list[i]=='Rome')
        {
          flag= false;
        }
      
      }
      if (flag){
      list.push('Rome')
      collect.updateOne(
        { username: req.session.username }, 
        { $set: { MywantToGo: list } }, 
        (err, result) => {
      })
      res.render('wanttogo',{list})}
      
      else if(flag==false)
      {
        res.redirect('/rome')
        alert("You aleady added it in the list");
      }}
     });
    });
  });
  app.post('/bali',(req,res)=>{
    MongoClient.connect(url,function(err,client){
      if (err)throw err;
    var db=client.db('myDB');
    const collect=db.collection("myCollection");
    collect.findOne({username:req.session.username},function(err,foundUser){
      if (err){
        console.log (err);}
     else if(foundUser){
      list= foundUser.MywantToGo;
      var flag = true;
      for(var i =0;i<list.length;i++)
      {
        if(list[i]=='bali')
        {
          flag= false;
        }
      
      }
      if (flag){
      list.push('bali')
      collect.updateOne(
        { username: req.session.username }, 
        { $set: { MywantToGo: list } }, 
        (err, result) => {
      })
      res.render('wanttogo',{list})}
      
      else if(flag==false)
      {
        res.redirect('/bali')
        alert("You aleady added it in the list");
      }}
     });
    });
  });
  app.post('/paris',(req,res)=>{
    MongoClient.connect(url,function(err,client){
      if (err)throw err;
    var db=client.db('myDB');
    const collect=db.collection("myCollection");
    collect.findOne({username:req.session.username},function(err,foundUser){
      if (err){
        console.log (err);}
     else if(foundUser){
      list= foundUser.MywantToGo;
      var flag = true;
      for(var i =0;i<list.length;i++)
      {
        if(list[i]=='paris')
        {
          flag= false;
        }
      
      }
      if (flag){
      list.push('paris')
      collect.updateOne(
        { username: req.session.username }, 
        { $set: { MywantToGo: list } }, 
        (err, result) => {
      })
      res.render('wanttogo',{list})}
     
      else if (flag==false)
      {
        req.redirect('/paris')
        alert("You aleady added it in the list");
      }}
     });
    });
  });
  app.post('/annapurna',(req,res)=>{
    MongoClient.connect(url,function(err,client){
      if (err)throw err;
    var db=client.db('myDB');
    const collect=db.collection("myCollection");
    collect.findOne({username:req.session.username},function(err,foundUser){
      if (err){
        console.log (err);}
     else if(foundUser){
      list= foundUser.MywantToGo;
      var flag = true;
      for(var i =0;i<list.length;i++)
      {
        if(list[i]=='annapurna')
        {
          flag= false;
        }
      
      }
      if (flag){
      list.push('annapurna')
      collect.updateOne(
        { username: req.session.username }, 
        { $set: { MywantToGo: list } }, 
        (err, result) => {
      })
      res.render('wanttogo',{list})}
      
      else if (flag==false)
      {
        res.redirect('/annapurna')
        alert("You aleady added it in the list");
      }}
     });
    });
  });
  app.post('/santorini',(req,res)=>{
    MongoClient.connect(url,function(err,client){
      if (err)throw err;
    var db=client.db('myDB');
    const collect=db.collection("myCollection");
    collect.findOne({username:req.session.username},function(err,foundUser){
      if (err){
        console.log (err);}
     else if(foundUser){
      list= foundUser.MywantToGo;
      var flag = true;
      for(var i =0;i<list.length;i++)
      {
        if(list[i]=='santorini')
        {
          flag= false;
        }
      
      }
      if (flag){
      list.push('santorini')
      collect.updateOne(
        { username: req.session.username }, 
        { $set: { MywantToGo: list } }, 
        (err, result) => {
      })
      res.render('wanttogo',{list})
      return;}
     
      
      else if (flag==false)
      {
        alert("You aleady added it in the list");
      }}
     });
    });
  });
  app.post('/searchresults',(req,res)=>{
  
  var list =["inca","rome","paris","bali","santorini","annapurna"];
  var x =req.body.Search;
  var flag = false;
  var mylist=[];
  for(var i=0;i<list.length;i++)
  {
     if(list[i].includes(x))
     {
      mylist.push(list[i]);
      flag=true;
     }
  }
  if(flag)
  {
   res.render('searchresults',{mylist:mylist});
   return;
  }
  else 
  {
    alert("“Destination not Found");
  }
   
  });

module.exports = app;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});