//selecting all required elements
window.onload= (event)=> {
    const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  //showFile(); //calling function
  uploadFile();
});
function uploadFile1() 
{
    function isUrlValid(userInput) {
        var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null)
            return false;
        else
            return true;
    }
    $(document).ready(function() {  
       $('#uploadForm').submit(function() {  
           $("#status").empty().text("File is uploading...");  
    
          $(this).ajaxSubmit({  
    
              error: function(xhr) {  
                      status('Error: ' + xhr.status);  
              },  
    
              success: function(response) {  
                      console.log(response);
                      if(response.success===true)
                      {
                          if(isUrlValid(response.output)==true){
                                window.open(response.output, '_blank');
                          }
                          else{
                            alert(response.output);
                          }
                      }  
                      $("#status").empty().text(response);  
              }  
      });  
    
      return false;  
      });      
  });
}

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  uploadFile(); //calling function
});

function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}

 async function uploadFile(){  
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
        /*$(this).ajaxSubmit({  
        
            error: function(xhr) {  
                    status('Error: ' + xhr.status);  
            },  

            success: function(response) {  
                    console.log(response);
                    if(response.success===true)
                    {
                        if(isUrlValid(response.output)==true){
                            window.open(response.output, '_blank');
                        }
                        else{
                        alert(response.output);
                        }
                    }  
                    $("#status").empty().text(response);  
            }  
    });*/
    const resizedImage= await resizeImage({
        file:file,
        maxSize:500
    });
    const formData = new FormData()
    formData.append('myFile',resizedImage );
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response =>{ 
        return response.json();
    })
    .then(data => {
        if(data.success===true)
            {
                if(isUrlValid(data.output)==true){
                    window.open(data.output, '_blank');
                }
                else{
                    alert("TEXT:\n" + data.output);
                }
            }
        else{
            alert("Invalid QR code!!");
        }  
        console.log(data)
    })
    .catch(error => {
        console.error(error)
    })
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
}

var resizeImage = function (settings) {
    var file = settings.file;
    var maxSize = settings.maxSize;
    var reader = new FileReader();
    var image = new Image();
    var canvas = document.createElement('canvas');
    var dataURItoBlob = function (dataURI) {
        var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            atob(dataURI.split(',')[1]) :
            unescape(dataURI.split(',')[1]);
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var max = bytes.length;
        var ia = new Uint8Array(max);
        for (var i = 0; i < max; i++)
            ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    };
    var resize = function () {
        var width = image.width;
        var height = image.height;
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataURItoBlob(dataUrl);
    };
    return new Promise(function (ok, no) {
        if (!file.type.match(/image.*/)) {
            no(new Error("Not an image"));
            return;
        }
        reader.onload = function (readerEvent) {
            image.onload = function () { return ok(resize()); };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    });
};
