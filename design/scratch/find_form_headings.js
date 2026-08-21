const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

const regex = /<section\s+id="forms"[\s\S]*?<\/section>/i;
const match = htmlSource.match(regex);
if (match) {
    console.log('Section forms length:', match[0].length);
    const headings = match[0].match(/<h[1-6][\s\S]*?<\/h[1-6]>/gi);
    console.log('Headings in section forms:', headings);
} else {
    console.log('Section forms not found');
}
