const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

const regex = /<section\s+id="([^"]+)"/g;
let match;
console.log('=== SECTIONS IN TAQNIYA DESIGN SYSTEM.HTML ===');
while ((match = regex.exec(htmlSource)) !== null) {
    console.log(`- ID: "${match[1]}"`);
}
