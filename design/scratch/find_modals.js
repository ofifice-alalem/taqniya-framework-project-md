const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

const regex = /id="([^"]*modal[^"]*)"/gi;
let match;
console.log('=== MODAL IDS IN SOURCE HTML ===');
while ((match = regex.exec(htmlSource)) !== null) {
    console.log(`- ${match[1]}`);
}

const sectionRegex = /id="([^"]*Modal[^"]*)"/gi;
while ((match = sectionRegex.exec(htmlSource)) !== null) {
    console.log(`- ${match[1]}`);
}
