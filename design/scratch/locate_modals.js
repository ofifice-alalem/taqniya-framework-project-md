const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

const modals = ['deleteModal', 'successModal', 'securityAlertModal', 'createRecordModal', 'wizardModal', 'detailModal', 'permissionsModal', 'feedbackRatingModal'];

modals.forEach(mId => {
    const idx = htmlSource.indexOf(`id="${mId}"`);
    if (idx !== -1) {
        const lineNum = htmlSource.substring(0, idx).split('\n').length;
        console.log(`- Modal #${mId} found at Line ${lineNum}`);
    } else {
        console.log(`- Modal #${mId} NOT FOUND`);
    }
});
