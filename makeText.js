/** Command-line tool to generate Markov text. */

// Importing modules like in python
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

// generate text
function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

// Read from file
function readFile(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading file: '${path}':`, err.message);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

// Read from URL
async function readURL(url) {
    try {
        let response = await axios.get(url);
        generateText(response.data);
    } catch {
        console.error(`Error fetching URL: '${url}':`, err.message);
        process.exit(1);
    }
}

// Process User Input
let [method, path] = process.argv.slice(2);

if (method === 'file') {
    readFile(path);
} else if (method === "url") {
    readURL(path);
} else {
console.error(`Unknown method: '${method}'. Expected 'file' or 'url'.`);
process.exit(1);
}

