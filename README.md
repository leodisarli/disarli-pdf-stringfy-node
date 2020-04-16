# pdf-stringfy

**js module to extract texts from PDFs.**

## Installation
`npm install pdf-stringfy`
 
## Basic Usage - Get all pages

```js
const fs = require('fs');
const PdfStringfy = require('pdf-stringfy');

let dataBuffer = fs.readFileSync('path-to-pdf');

PdfStringfy(dataBuffer).then(function(data) {
	console.log(data.numpages);
	console.log(data.numrender);
	console.log(data.info);
	console.log(data.metadata); 
	console.log(data.version);
	console.log(data.text); 
});
```

## Get only one page 35

```js
const fs = require('fs');
const PdfStringfy = require('pdf-stringfy');

let dataBuffer = fs.readFileSync('path-to-pdf');

let options = {
    onePageOnly: 35,
};

PdfStringfy(dataBuffer, options).then(function(data) {
	console.log(data.numpages);
	console.log(data.numrender);
	console.log(data.info);
	console.log(data.metadata); 
	console.log(data.version);
	console.log(data.text);
});
```

## Exception Handling

```js
const fs = require('fs');
const PdfStringfy = require('pdf-stringfy');

let dataBuffer = fs.readFileSync('path-to-pdf');

PdfStringfy(dataBuffer).then(function(data) {
	console.log(data.text);
})
.catch(function(error){
	console.error("error", error.message);
})
```

## Example
* `npm run example` or `node example/pdf-stringfy-example.js`
* Check [example code](https://github.com/leodisarli/disarli-pdf-stringfy-node/master/example/pdf-stringfy-example.js). When you run the example you should have an output.txt with parsed input.pdf file.

## Test
* `mocha` or `npm test`
* Check [test folder](https://github.com/leodisarli/disarli-pdf-stringfy-node/master/test).

## License
[MIT licensed](https://gitlab.com/autokent/pdf-parse/blob/master/LICENSE) and all it's dependencies are MIT or BSD licensed.
