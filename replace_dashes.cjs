const fs = require('fs');

const filePath = 'src/data/blogPosts.json';
const content = fs.readFileSync(filePath, 'utf8');
const newContent = content.replace(/—/g, '-');

fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Replaced em dashes with hyphens.");
