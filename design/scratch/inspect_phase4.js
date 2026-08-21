const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

const phase4Sections = [
    { id: 'tables', folder: '06-table' },
    { id: 'forms', folder: '12-form' },
    { id: 'modals', folder: '13-modal' },
    { id: 'tasks', folder: '14-progress' },
    { id: 'feedback', folder: '15-feedback' },
    { id: 'accordion', folder: '18-accordion' },
    { id: 'collapse', folder: '19-collapse' },
    { id: 'carousel', folder: '20-carousel' },
    { id: 'tabs', folder: '21-tabs' }
];

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

console.log('=== INSPECTING PHASE 4 SECTIONS ===');
phase4Sections.forEach(s => {
    const raw = extractExactSection(s.id);
    if (!raw) {
        console.error(`[!] Section ${s.id} NOT FOUND!`);
        return;
    }
    const handlers = raw.match(/on[a-zA-Z]+\s*=\s*"([^"]+)"/g) || [];
    console.log(`- Section "${s.id}" -> folder "${s.folder}" (${raw.split('\n').length} lines, ${handlers.length} handlers)`);
});
