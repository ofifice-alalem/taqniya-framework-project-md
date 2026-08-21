const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.resolve(__dirname, '../..');

function debugFile(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    try {
        new vm.Script(code, { filename: path.basename(filePath) });
        console.log(`[OK] ${path.basename(filePath)} passed.`);
    } catch (e) {
        console.error(`Syntax error in ${path.basename(filePath)}:`);
        console.error(e.stack);
    }
}

debugFile(path.join(rootDir, 'FRAMEWORK/01_design_system/components/12-form/component.js'));
debugFile(path.join(rootDir, 'FRAMEWORK/01_design_system/js/taqniya.js'));
