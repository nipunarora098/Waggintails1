const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const multer = require('multer');
const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const socket = require("socket.io");
var bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const MOGOURI = process.env.MOGOURI;
// const userRouter = require('./routes/users');
// app.use('/users', userRouter);
// import fs from "fs";
// import axios from 'axios';
const app = express();
app.use(cors());
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json({limit: '400kb'}));
app.use(express.json());
const defaultImage = fs.readFileSync('profile.png' );
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);
mongoose.connect(
  "mongodb+srv://Nipun:07May1973%40@cluster0.bafjt77.mongodb.net/WagginTails?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("WagginTails DB connected");
  }
);
//------------------------------------------------------------------------------------
// User Schema -----------------------------------------------------------------------
//------------------------------------------------------------------------------------
const userSchema = new mongoose.Schema({
  UserName: String,
  Email: String,
  Password : String,
  First_Name:String,
  Last_Name : String,
  Address:String,
  City: String,
  State:String,
  Contact_No : String,
  Postal_Code : String,
  About : String,
  PetName : String,
  PetBreed :String , 
  PetAge : String ,
  PetGender:String , 
  PetAbout :String , 
  PetSchedule : String,
  image:{
    data : Buffer,
    contentType :String
  }
});
const User = new mongoose.model("User", userSchema);
//--------------------------------------------------
// For Login ---------------------------------------
app.post("\api/login", (req, res) => {
  const data = req.body;
  User.findOne({UserName : data.UserName} , (err , user) => {
    if(user){
        bcrypt.compare(data.Password , user.Password , function (err , result){
          if(result == true){
            res.send({message : "Login Successfully " , user : user});
          }
          else{
            res.send({message : "Password didn't match"});

          }
        })
    }
    else {
        res.send({message: "User not registered"});
    }
  })
  
});
//-------------------------------
// For Register -----------------
app.post("/api/register", (req, res) => {
  const data = req.body;
  User.findOne({ UserName : data.UserName }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered"  });
    } 
    else {
      bcrypt.hash(data.Password  , 10 , function (err , hash ){
        const user = new User({
          UserName: data.UserName,
          Email : data.Email,
          Password : hash,
          image :{
            data:defaultImage ,
            contentType :'image/*'
          },
          About : "",
          Address : "",
          City : "",
          Contact_No : "",
          First_Name : "",
          Last_Name : "",
          Postal_Code : "",
          State:"",
          PetAge : "",
          PetBreed :"",
          PetAbout : "",
          PetSchedule:"",
          PetName : "",
          PetGender : ""
        });
        user.save((err,user_) => {
          if (err) res.send(err);
          else res.send({ message: "Successfully Registered" , user : user_ });
        });
      })
      
    }
  });
});
//---------------------------------------------------------------------------------
//For Returning User details
app.post("/SubmitUserDetails" , (req , res) => {
  const user_id = req.body._id;
  User.findOneAndUpdate({_id :user_id},
    req.body
  , (err , user) => {
    res.send({message : "Details Updated Successfully"});
  })
});
let server ;
if(process.env.API_PORT){
server = app.listen(process.env.API_PORT, () => {
  console.log(`server is running on port ${process.env.API_PORT}`);
});}
// -----------------------------------------------------------------------------------------
// For Changing Profile

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null,path.join( __dirname ,'public/images/uploads'));
  },
  filename: function(req, file, cb) {   
      cb(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({storage : storage});
app.post('/ChangeProfile' , upload.single('Image') ,(req , res) =>{
    User.findOneAndUpdate({_id:req.body.id} , {
        image : {
          data : fs.readFileSync(req.file.path),
          contentType : 'image/*'
        }
    } , (err, user) =>{
        res.send({message : 'Image uploaded Successfully'});
    });
});
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.get('/GetProfilePhoto/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.send(err);
    else {
      if(user.image.data){
      res.contentType(user.image.contentType);
      res.send(user.image.data);
      }
    }
   });
});
//------------------------------------------------------
// Submit Pet Details ----------------------------------
app.post("/SubmitPetDetails" , (req , res) => {
  const user_id = req.body._id;
  User.findOneAndUpdate({_id :user_id},
    req.body
  , (err , user) => {
    res.send({message : "Details Updated Successfully" , user : user});
  })
});
//-------------------------------------------
//Add photo images schema -------------------
//-------------------------------------------
const ImageSchema = new mongoose.Schema({
  user_id : ObjectId,
  image :{
    data : Buffer , 
    contentType : String 
  }
});
const Image = new mongoose.model("Image" , ImageSchema);
app.post('/AddPhotos' , upload.single('Image') ,(req , res) =>{
    const image = new Image({
      user_id : req.body.id,
      image : {
        data : fs.readFileSync(req.file.path),
        contentType : 'image/*'
      }
    });
    image.save((err,user_) => {
      if (err) res.send(err);
      else res.send({ message: "Photo Uploaded Successfully"  });
    });
});
//------------------------------------------------------------------------
// GetImages to display in Pet Profile -----------------------------------
//------------------------------------------------------------------------
app.get('/GetImages/:id', (req, res) => {
  Image.find({user_id : req.params.id})
  .then(image => {
    res.json(image);
  })
  .catch(err => res.status(404).json({noimagefound: "No image found"}));
});
//---------------------------------------------
// Delete Photo -------------------------------
//---------------------------------------------
app.post('/DeletePhoto' , (req , res) =>{
  console.log(req.body);
  Image.findOneAndDelete({_id : req.body.id},function(err){
    if(err) res.send(err);
    else res.send({message:"Photo Deleted Successfully"});
  })
})
//------------------------------------------------------------------------
// return members list  --------------------------------------------------
//------------------------------------------------------------------------

app.get('/GetMembers/:id' , async (req , res) => {
  const [user1, user2] = await Promise.all([
    Friends.find({ User1: req.params.id }).select(["User2"]),
    Friends.find({ User2: req.params.id }).select(["User1"]),
  ]);
  const friendsIds1 = user1.map(friend => friend.User2);
  const friendsIds2 = user2.map(friend => friend.User1);
  User.find({
    $and:[
      {_id : {$ne: req.params.id}},
      {_id : {$nin : friendsIds1}},
      {_id : {$nin : friendsIds2}}
    ]
  },(err , users) => {
    
    if(err) return res.status(500).send(err);
    res.send(users);
  });
});
//------------------------------------------------------------------------
// send request --------------------------------------------------
//------------------------------------------------------------------------
const RequestSchema = new mongoose.Schema({
  Sender : ObjectId,
  Receiver : ObjectId,
  PetName : String,
  image : Object
});
const Requests = new mongoose.model("Requests" , RequestSchema);
app.post('/SendRequest' , (req , res) => {
  const request = new Requests({
    Sender : req.body.Sender,
    Receiver : req.body.Receiver,
    PetName : req.body.Name,
    image : req.body.Image
  })

  Requests.findOne({Sender : req.body.Sender , Receiver : req.body.Receiver} , (err , Request) =>{
    if(Request){
      res.send({message : "Already Sent " , Request : Request})
    }
    else{
      Requests.findOne({Receiver : req.body.Sender , Sender : req.body.Receiver} , (err ,Request) =>{
        if(Request){
          res.send({message : "Request Already Received , Check Notifications."});
        }
        else{
          request.save((err , Request_) => {
            res.send({message:"Request Send Successfully" , Request:Request_});
          });
        }
      })
    }
    
    
  });
  
});
//------------------------------------------------------------------------
// Get request --------------------------------------------------
//------------------------------------------------------------------------

app.get('/GetRequests/:id' , (req , res) => {
  Requests.find({Receiver : req.params.id},(err , Requests) => {
    if(err) return res.status(500).send(err);
    res.send(Requests);
  });
});
//---------------------------------------------------
//Friends Schema ------------------------------------
//---------------------------------------------------
const FriendSchema = new mongoose.Schema({
  User1 : ObjectId,
  User2 : ObjectId
})
const Friends = new mongoose.model("Friends" , FriendSchema);
//-----------------------------------------------------
// Accept Request ------------------------------------------
//-----------------------------------------------------
app.post('/AcceptRequest' , (req,res) => {
  const friend = new Friends({
    User1 : req.body.Sender,
    User2 : req.body.Receiver
  })
  friend.save((err , friend ) =>{
      if(err) res.send(err);
  });
  Requests.findOneAndDelete (req.body,function(err){
    if(err) res.send(err);
    else res.send({message:"Request Accepted"});
  })
});
//---------------------------------------------------
//Delete Request ------------------------------------
//---------------------------------------------------
app.post('/DeleteRequest' , (req,res) => {
  Requests.findOneAndDelete(req.body,function(err){
    if(err) res.send(err);
    else res.send({message:"Request Deleted"});
  })
});
//---------------------------------------------------
//Get Contacts ------------------------------------
//---------------------------------------------------
app.get('/GetContacts/:id', async (req, res) => {
  const [user1, user2] = await Promise.all([
    Friends.find({ User1: req.params.id }).select(["User2"]),
    Friends.find({ User2: req.params.id }).select(["User1"]),
  ]);
  const Friend_List = [...user1,...user2].map(friend=>friend.User1||friend.User2)
  const data = [];
  for (let i = 0; i < Friend_List.length; i++) {
    const temp = await User.findById(Friend_List[i]).select([
      "PetName",
      "Email",
      "image",
      "_id",
    ]);
    data.push(temp);
  }
  res.json(data);
});
//--------------------------------------------------------------------------
// Message Schema  in chat application -------------------------------------
//--------------------------------------------------------------------------
const messageSchema = new mongoose.Schema(
  {
    message:{
      text:{
        type : String , 
        required : true
      }
    },
    users:Array,
    sender : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true,
    },
  },

  {
    timestamps : true,
  }
)
const Messages = new mongoose.model("Messages"  , messageSchema);

app.post("/AddMessage" ,  async(req , res) =>{
  const {from , to , message} = req.body;
  const data = new Messages({
    message:{text : message}, 
    users:[from , to], 
    sender:from, 
  })
  data.save((err , data) =>{
    if(err) res.send({message : "Failed to save message in the database"});
    else res.send({message : "Message added Successfully "});
  })
});
app.post("/GetAllMessages" , async(req , res) =>{
  const {from , to} = req.body;
  const messages = await Messages.find({
    users:{
      $all:[from , to] , 
    },
  })
  .sort({updatedAt : 1});
  const projectMessages = messages.map((msg) =>{
    return {
      fromSelf : msg.sender.toString() === from , 
      message : msg.message.text,
    };
  });
  res.json(projectMessages);
})
//=================================================================
// socket -------------------------------------------------------------
//=================================================================

const io = socket(server , {
  cors : {
    origin : "http://localhost:3000",
    Credentials : true , 
  },
})
global.onlineUsers = new Map();
io.on('connection' , (socket) =>{
  global.chatSocket = socket ;
  socket.on('add-user' , (userId) =>{
    onlineUsers.set(userId , socket.id);
  });
  socket.on("send-msg" , (data) =>{
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-receive" , data.message);
    }
  })
});
//----------------------------------------------
// Get User details ----------------------------
//----------------------------------------------
app.post('/GetUserDetails', (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (err) return res.send(err);
    else {
      res.send({user:user});
    }
   });
});
module.exports = app;