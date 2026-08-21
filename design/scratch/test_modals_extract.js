const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');
const lines = htmlSource.split('\n');

// Find all modals from line 7080 to 8015
const allModalsText = lines.slice(7080, 8015).join('\n')
    .replace(/src="assets\//g, 'src="../../assets/images/')
    .replace(/href="assets\//g, 'href="../../assets/images/');

console.log('Total length of all modals:', allModalsText.length);
console.log('Contains wizardModal:', allModalsText.includes('id="wizardModal"'));
console.log('Contains deleteModal:', allModalsText.includes('id="deleteModal"'));
console.log('Contains createRecordModal:', allModalsText.includes('id="createRecordModal"'));
console.log('Contains detailModal:', allModalsText.includes('id="detailModal"'));
console.log('Contains permissionsModal:', allModalsText.includes('id="permissionsModal"'));
console.log('Contains feedbackRatingModal:', allModalsText.includes('id="feedbackRatingModal"'));
