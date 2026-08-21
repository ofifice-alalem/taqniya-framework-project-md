const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');

function checkSyntax(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    try {
        new Function(code);
        console.log(`[OK] ${path.basename(filePath)} syntax is VALID`);
    } catch (e) {
        console.error(`[ERROR] in ${path.basename(filePath)}:`, e.message);
    }
}

checkSyntax(path.join(rootDir, 'FRAMEWORK/01_design_system/components/12-form/component.js'));
checkSyntax(path.join(rootDir, 'FRAMEWORK/01_design_system/js/taqniya.js'));
