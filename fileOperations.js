// Importing the Node.js File System module
const fs = require('fs');

// Function to read content from input.txt
function readInputFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('input.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Function to modify content (e.g., add a prefix)
function modifyContent(content) {
    // Example modification: Adding a prefix
    return content.split('\n').map(line => `Modified: ${line}`).join('\n');
}

// Function to write modified content to output.txt
function writeOutputFile(modifiedContent) {
    return new Promise((resolve, reject) => {
        fs.writeFile('output.txt', modifiedContent, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Main function to orchestrate the process
async function main() {
    try {
        // Read content from input.txt
        const content = await readInputFile();

        // Modify the content
        const modifiedContent = modifyContent(content);

        // Write modified content to output.txt
        await writeOutputFile(modifiedContent);

        console.log('File operation completed successfully.');
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the main function to start the process
main();
