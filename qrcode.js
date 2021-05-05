const Jimp = require("jimp");
const fs = require('fs')
const qrCode = require('qrcode-reader');

async function scanner(url)
{
    let res='';
    console.log(__dirname + '/uploads/' +  url);
    const buffer = fs.readFileSync(__dirname + '/uploads/' +  url);
    try{
        const image = await Jimp.read(buffer);
        let qrcode = new qrCode();
        qrcode.callback = function(err, value) {
            if (err) {
                console.error(err);
            }
            console.log(value.result);
            res=value.result;
            console.log(res);
        };
        qrcode.decode(image.bitmap);
        return res;
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

module.exports =scanner;