var express               = require("express");
var app                   = express();
var bodyParser            = require("body-parser");
var mongoose              = require("mongoose");
var methodOverride        = require("method-override");
var passport              = require("passport");
var LocalStrategy         = require("passport-local");
var User                  = require("./models/user");

app.use(express.static(__dirname + '/public'));
mongoose.connect("mongodb://localhost/current");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.set("views", (__dirname,"views"));
app.use(methodOverride("_method"));



var appSchema = new mongoose.Schema({
  projectid : String,
    projectname : String,
    assignedto : String,
    date : String,
    duedate : String,
    amount : String,
    advance : String,
    balance : String,
    customer: String,
    contact : String,
    address: String,
    sellingprice:String,
    sellingadvance:String,
    sellingbalance:String
    
})

var New = mongoose.model("New",appSchema);


app.get("/adminsignin",function(req,res){
    res.render("adminsignin");
});


app.get("/usersignin",function(req,res){
    res.render("usersignin");
});



app.get("/dashboard",function(req,res){
    New.find({},function(err,all){
        if(err){
            console.log(err);
        } else{
    res.render("dashboard",{all:all});        
        }
    });
    
});


app.get("/assignproject",function(req,res){
    res.render("assignproject");
});


app.get("/developer",function(req,res){
     New.find({},function(err,all){
        if(err){
            console.log(err);
        } else{
    res.render("developer",{all:all});        
        }
    });
});


app.get("/developer/:id",function(req,res){
     
    New.findById(req.params.id,function(err,click){
        if(err){
            console.log(err);
        } else {
    res.render("editassignproject",{passing:click});        
        }
   });
});


app.put("/editassignproject/:id",function(req,res){
    New.findByIdAndUpdate(req.params.id,req.body.edit,function(err,updated){
        if(err){
            res.redirect("/developer");
        }  else {
            res.redirect("/developer");    
        }
    });
    
});


app.get("/customer",function(req,res){
     New.find({},function(err,all){
        if(err){
            console.log(err);
        } else{
    res.render("customer",{all:all});        
        }
    });
});


app.get("/customer/:id",function(req,res){
     
    New.findById(req.params.id,function(err,click){
        if(err){
            console.log(err);
        } else {
    res.render("addcustomer",{passing:click});        
        }
   });
});


app.put("/addcustomer/:id",function(req,res){
    New.findByIdAndUpdate(req.params.id,req.body.edit,function(err,updated){
        if(err){
            res.redirect("/customer");
        }  else {
            res.redirect("/customer");    
        }
    });
    
});



app.get("/payment",function(req,res){
      New.find({},function(err,all){
        if(err){
            console.log(err);
        } else{
    res.render("payment",{all:all});        
        }
    });
});


app.get("/payment/:id",function(req,res){
     
    New.findById(req.params.id,function(err,click){
        if(err){
            console.log(err);
        } else {
    res.render("editpayment",{passing:click});        
        }
   });
});


app.put("/editpayment/:id",function(req,res){
    New.findByIdAndUpdate(req.params.id,req.body.edit,function(err,updated){
        if(err){
            res.redirect("/payment");
        }  else {
            res.redirect("/payment");    
        }
    });
    
});


app.get("/chat",function(req,res){
    res.render("chat");
});


app.get("/adminregisteration",function(req,res){
    res.render("adminregisteration");
});


app.get("/developerregisteration",function(req,res){
    res.render("developerregisteration");
});


app.get("/account",function(req,res){
    res.render("account");
});

app.post("/form",function(req,res){
  var  projectid  = req.body.projectid, 
       projectname = req.body.projectname,
      assignedto = req.body.assignedto,
      date = req.body.date,
      duedate = req.body.duedate,
      amount = req.body.amount,
      advance = req.body.advance,
      balance = req.body.balance,
      description = req.body.description
  
  var every ={projectid:projectid,projectname:projectname,assignedto:assignedto,date:date,duedate:duedate,amount:amount,advance:advance,balance:balance,description:description}
  
  New.create(every,function(err,every){
      if(err){
          console.log(err);
      } else {
          console.log(every);
          res.redirect("/dashboard");
      }
  });
});


app.listen(4000,function(){
    console.log("server started-----4000-----");
});