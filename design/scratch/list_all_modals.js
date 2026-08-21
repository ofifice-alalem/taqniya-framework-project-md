const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

const regex = /<div\s+id="([^"]*Modal[^"]*)"/gi;
let match;
console.log('=== ALL MODALS IN SOURCE HTML ===');
while ((match = regex.exec(htmlSource)) !== null) {
    const idx = match.index;
    const line = htmlSource.substring(0, idx).split('\n').length;
    console.log(`- Modal id: "${match[1]}" at line ${line}`);
}
