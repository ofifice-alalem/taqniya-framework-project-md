const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

const regex = /<section\s+id="([^"]*)"/gi;
let match;
while ((match = regex.exec(htmlSource)) !== null) {
    console.log(`- Section id: "${match[1]}"`);
}
