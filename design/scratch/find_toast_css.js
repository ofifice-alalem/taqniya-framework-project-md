const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');
const cssSource = fs.readFileSync(path.join(rootDir, 'design/css/style.css'), 'utf8');

function findRules(src, name) {
    const regex = new RegExp('\\.bx-toast[^{]*\\{[^}]*\\}', 'gi');
    const matches = src.match(regex) || [];
    console.log(`Found ${matches.length} rules in ${name}:`);
    matches.forEach(m => console.log(m));
}

findRules(htmlSource, 'HTML');
findRules(cssSource, 'CSS');
