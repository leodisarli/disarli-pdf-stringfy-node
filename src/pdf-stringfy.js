const Pdfjs = require('pdfjs-dist');

function render_page(pageData) {
  let render_options = {
    normalizeWhitespace: false,
    disableCombineTextItems: false
  }

  return pageData.getTextContent(render_options)
    .then(function (textContent) {
      let lastY, text = '';
      for (let item of textContent.items) {
        if (lastY == item.transform[5] || !lastY) {
          text += item.str;
        }
        else {
          text += '\n' + item.str;
        }
        lastY = item.transform[5];
      }
      return text;
    });
}

const DEFAULT_OPTIONS = {
  pagerender: render_page,
  max: 0,
  onePageOnly: 0,
}

async function Pdf(dataBuffer, options) {
  let ret = {
    numpages: 0,
    numrender: 0,
    info: null,
    metadata: null,
    text: "",
    version: null
  };

  if (typeof options == 'undefined') options = DEFAULT_OPTIONS;
  if (typeof options.pagerender != 'function') options.pagerender = DEFAULT_OPTIONS.pagerender;
  if (typeof options.max != 'number') options.max = DEFAULT_OPTIONS.max;
  if (typeof options.version != 'string') options.version = DEFAULT_OPTIONS.version;
  if (options.version == 'default') options.version = DEFAULT_OPTIONS.version;

  ret.version = Pdfjs.version;

  Pdfjs.disableWorker = true;
  let doc = await Pdfjs.getDocument(dataBuffer).promise;
  ret.numpages = doc.numPages;

  let metaData = await doc.getMetadata().catch(function (err) {
    return null;
  });

  ret.info = metaData ? metaData.info : null;
  ret.metadata = metaData ? metaData.metadata : null;

  let onePageOnly = options.onePageOnly <= 0 ? 0 : options.onePageOnly;
  let counter = options.max <= 0 ? doc.numPages : options.max;
  counter = counter > doc.numPages ? doc.numPages : counter;

  ret.text = "";

  if (onePageOnly > 0) {
    let pageText = await doc.getPage(onePageOnly).then(pageData => options.pagerender(pageData)).catch((err) => {
      return "";
    });
    ret.text = `${ret.text}\n\n${pageText}`;
    return ret;
  }
  for (var i = 1; i <= counter; i++) {
    let pageText = await doc.getPage(i).then(pageData => options.pagerender(pageData)).catch((err) => {
      return "";
    });

    ret.text = `${ret.text}\n\n${pageText}`;
  }

  ret.numrender = counter;
  doc.destroy();

  return ret;
}

module.exports = Pdf;
