
# QR-CODE SCANNER
## Live-Link : 
	https://sleepy-tundra-77425.herokuapp.com/

## Introduction : 
	This application enables the user to scan any particular QR code and view the generated result via phone/web.
	
 ### Features:
 
	1) The generated result of the QR code will open up in a new window iff it's a valid URL.
	2) DESKTOP/WEB :  User can either drag and drop the image of the QR code or upload one using the browse button.
	3) IOS/ANDROID :  User can scan a QR code using the phone camera by clicking on the browse button.
 
## Tech-Stack:

#### 1.HTML5,CSS3, Javascript
	Used for creating and styling the webpages	
#### 2.NodeJS
	Node.js is an open-source and cross-platform JavaScript runtime environment.Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser.A Node.js app runs in a single process, without creating a new thread for every request. 
#### 3.ExpressJS
	Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.Express provides a thin layer of fundamental web application features, without obscuring NodeJS.Creating API is quick and easy.
#### 4.qrcode-reader,Jimp,Multer
	qrcode-reader:for decoding the uploaded QR codes
	Jimp: for parsing the uploaded images
	Multer: for uploading files/images
#### 5.pm2
	PM2 is daemon process manager that will help you manage and keep your application online. Getting started with PM2 is straightforward,it is offered as a simple and intuitive CLI, installable via npm.
#### 6.Heroku
	Heroku is a cloud platform(PAAS) as a service supporting several programming languages that enables developers to build, run, and operate applications entirely in the cloud.
#### 7. Apache Benchmark
	`ab` is a tool for benchmarking your Apache Hypertext Transfer Protocol (HTTP) server. It is designed to give you an impression of how your current Apache installation performs. This especially shows you how many requests per second your Apache installation is capable of serving.

 ## System Architecture:
 ![enter image description here](https://raw.githubusercontent.com/yskot1999/QR-CODE-Scanner/master/Images/architecture.png)
 
## API Documentation:
	EndPoint     : '/upload'
	Method       : POST,
	Content-Type : multi-part,
	Body         : encoded image-file,
	Response     : {success:boolean,output:decoded result},
	Sample CuRL  :  curl 'https://sleepy-tundra-77425.herokuapp.com/upload' \
			  -H 'Connection: keep-alive' \
			  -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Mobile Safari/537.36' \
			  -H 'Content-Type: multipart/form-data; boundary=----WebKitFormBoundarynHvJY7tKzFcJLfJB' \
			  -H 'Accept: */*' \
			  -H 'Origin: https://sleepy-tundra-77425.herokuapp.com' \
			  -H 'Sec-Fetch-Site: same-origin' \
			  -H 'Sec-Fetch-Mode: cors' \
			  -H 'Sec-Fetch-Dest: empty' \
			  -H 'Referer: https://sleepy-tundra-77425.herokuapp.com/' \
			  -H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \ 	 
	 
## Results & Benchmarking :
	-Decreased Upload time -Images were compressed before uploading in order to speed up the working of the API.
		>Initial time: 6-8 sec
		>Final time  : 2-3 sec
	-Benchmarking done using Apache Benchmark.Thus the system will be able to run or handle atleast 11 requests/sec which satisfies the given criteria of 1 Million requests/day
![enter image description here](https://raw.githubusercontent.com/yskot1999/QR-CODE-Scanner/master/Images/Result.jpg)
## Images: 
![enter image description here](https://raw.githubusercontent.com/yskot1999/QR-CODE-Scanner/master/Images/initial%20page.png)![enter image description here](https://raw.githubusercontent.com/yskot1999/QR-CODE-Scanner/master/Images/drag_&_drop.png)
![](https://raw.githubusercontent.com/yskot1999/QR-CODE-Scanner/master/Images/alert.png)
