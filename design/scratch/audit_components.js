const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const componentsDir = path.join(rootDir, 'FRAMEWORK/01_design_system/components');
const taqniyaCSS = fs.readFileSync(path.join(rootDir, 'FRAMEWORK/01_design_system/css/taqniya.css'), 'utf8');
const taqniyaJS = fs.readFileSync(path.join(rootDir, 'FRAMEWORK/01_design_system/js/taqniya.js'), 'utf8');
const originalJS = fs.readFileSync(path.join(rootDir, 'design/js/main.js'), 'utf8');
const originalHTML = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

console.log('=== AUDITING ALL PHASE 2 COMPONENTS ===');

const components = fs.readdirSync(componentsDir);
components.forEach(comp => {
    const compDir = path.join(componentsDir, comp);
    if (!fs.statSync(compDir).isDirectory()) return;

    const indexPath = path.join(compDir, 'index.html');
    const compJSPath = path.join(compDir, 'component.js');

    if (!fs.existsSync(indexPath)) {
        console.log(`[!] ${comp}: index.html missing!`);
        return;
    }

    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    const compJS = fs.existsSync(compJSPath) ? fs.readFileSync(compJSPath, 'utf8') : '';
    const combinedJS = taqniyaJS + '\n' + compJS + '\n' + originalJS;

    // Check all onclick / oninput / onchange in HTML
    const handlers = htmlContent.match(/on[a-zA-Z]+\s*=\s*"([^"]+)"/g) || [];
    const missingFuncs = [];

    handlers.forEach(h => {
        const code = h.replace(/on[a-zA-Z]+\s*=\s*"/, '').replace(/"$/, '');
        // extract function name
        const funcMatch = code.match(/([a-zA-Z0-9_$]+)\s*\(/);
        if (funcMatch) {
            const funcName = funcMatch[1];
            if (!combinedJS.includes(`function ${funcName}`) && 
                !combinedJS.includes(`${funcName} =`) && 
                !['stopPropagation', 'preventDefault', 'remove', 'focus'].includes(funcName)) {
                missingFuncs.push(funcName);
            }
        }
    });

    console.log(`- ${comp}: ${handlers.length} event handlers found. Missing functions: ${[...new Set(missingFuncs)].join(', ') || 'None'}`);
});
