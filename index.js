const Tesseract = require('tesseract.js');

const input = process.argv[2];

const run = function (input) {
    Tesseract.recognize(
        input,
        'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        console.log(text);
        return text
    })
}

run(input);

