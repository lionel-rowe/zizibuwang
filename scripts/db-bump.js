const fs = require('fs');
const path = require('path');

const newVersion = new Date().valueOf();

fs.writeFileSync(
    path.join(__dirname, '../src/db-version.json'),
    newVersion.toString(),
);

console.info(newVersion);
