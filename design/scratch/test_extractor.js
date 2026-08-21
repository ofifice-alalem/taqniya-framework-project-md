const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

// Function to extract exact section by ID
function extractExactSection(sectionId) {
    const startTagRegex = new RegExp(`<section\\s+id="${sectionId}"[\\s\\S]*?>`, 'i');
    const startMatch = startTagRegex.exec(htmlSource);
    if (!startMatch) {
        console.error(`Section #${sectionId} not found!`);
        return null;
    }

    const startIndex = startMatch.index;
    const nextSectionRegex = /<section\s+(?:id="[^"]*"|class="[^"]*")/gi;
    nextSectionRegex.lastIndex = startIndex + startMatch[0].length;
    const nextMatch = nextSectionRegex.exec(htmlSource);

    let endIndex = nextMatch ? nextMatch.index : htmlSource.lastIndexOf('</main>');
    let rawSection = htmlSource.substring(startIndex, endIndex).trim();

    // Adjust relative asset paths from assets/ to ../../assets/images/
    rawSection = rawSection.replace(/src="assets\//g, 'src="../../assets/images/');
    rawSection = rawSection.replace(/href="assets\//g, 'href="../../assets/images/');

    return rawSection;
}

console.log('Testing extraction:');
const navbarSection = extractExactSection('navbar');
console.log('Navbar extracted lines:', navbarSection ? navbarSection.split('\n').length : 0);

const bpSection = extractExactSection('breakpoints');
console.log('Breakpoints extracted lines:', bpSection ? bpSection.split('\n').length : 0);
