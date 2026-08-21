const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

const phase3Sections = ['media', 'colors', 'kpi', 'buttons', 'button-groups', 'cards', 'badges'];

function extractExactSection(sectionId) {
    const startTagRegex = new RegExp(`<section\\s+id="${sectionId}"[\\s\\S]*?>`, 'i');
    const startMatch = startTagRegex.exec(htmlSource);
    if (!startMatch) return null;

    const startIndex = startMatch.index;
    const nextSectionRegex = /<section\s+(?:id="[^"]*"|class="[^"]*")/gi;
    nextSectionRegex.lastIndex = startIndex + startMatch[0].length;
    const nextMatch = nextSectionRegex.exec(htmlSource);

    let endIndex = nextMatch ? nextMatch.index : htmlSource.lastIndexOf('</main>');
    return htmlSource.substring(startIndex, endIndex).trim();
}

phase3Sections.forEach(id => {
    const sec = extractExactSection(id);
    if (!sec) {
        console.log(`[!] Section ${id} not found`);
        return;
    }
    const handlers = sec.match(/on[a-zA-Z]+\s*=\s*"([^"]+)"/g) || [];
    console.log(`Section "${id}" (${sec.split('\n').length} lines):`);
    console.log(`  Event handlers (${handlers.length}):`, handlers);
});
