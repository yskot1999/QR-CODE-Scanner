const express=require("express");
const multer = require('multer');
const scanner=require('./qrcode');
const path=require('path');
const app = express();
const PORT=process.env.PORT|| 4000;
app.listen(PORT,() => console.log(`server running on port ${PORT}`));
app.use('/script.js', express.static(path.join(__dirname, 'script.js')));
app.use('/style.css', express.static(path.join(__dirname, 'style.css')))
var pathnm='';
var storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './uploads');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
      pathnm=file.originalname;
      console.log(pathnm);
    }  
  });  
var upload = multer({ storage : storage}).single('myFile');  
    
app.get('/',function(req,res){  
        res.sendFile(__dirname + "/index.html");  
});  
    
app.post('/upload', function(req,res){  
    console.log(pathnm,"hello");
    
    upload(req,res,async function(err) {  
        console.log(pathnm)
        if(err) {  
            return res.end("Error uploading file.");  
        }  
        try{
            console.log(pathnm,"finally");
            const out=await scanner(pathnm);
            //res.end("hellop----");
            res.json({"success" : true,'output': out});
        }  
        catch(err){
            console.log(err);
            res.json({"success" : false,'err': err});
        }
    });  
    
    
});  