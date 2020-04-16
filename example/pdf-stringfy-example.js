const PdfStringfy = require('../');
const fs = require('fs');

let dataBuffer = fs.readFileSync('./example/input.pdf');
PdfStringfy(dataBuffer).then(function(data) {
    fs.writeFileSync(`./example/output.txt`, data.text, {
        encoding: 'utf8',
        flag: 'w'
    });
    console.log("file generated");
}).catch(function(error) {
    console.error("error", error.message);
});
