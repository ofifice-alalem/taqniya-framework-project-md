const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

const regex = /<section\s+id="carousel"[\s\S]*?<\/section>/i;
const match = htmlSource.match(regex);
if (match) {
    console.log(match[0]);
}
