const express=require("express");
const multer = require('multer');
const scanner=require('./qrcode');
const app = express();
const PORT=process.env.PORT|| 4000;
app.listen(PORT,() => console.log(`server running on port ${PORT}`));

var path='';
var storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './uploads');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
      path=file.originalname;
      //console.log(path);
    }  
  });  
var upload = multer({ storage : storage}).single('myfile');  
    
app.get('/',function(req,res){  
        res.sendFile(__dirname + "/index.html");  
});  
    
app.post('/upload',function(req,res){  
    console.log(path);
    upload(req,res,async function(err) {  
        if(err) {  
            return res.end("Error uploading file.");  
        }  
        try{
            const out=await scanner(path);
            res.json({"success" : true,'output': out});
        }  
        catch(err){
            res.json({"success" : false,'err': err});
        }
    });  
});  