const fs = require('fs');
let content = fs.readFileSync('lib/site.ts', 'utf8');

const prefix = `const basePath = process.env.NODE_ENV === "production" ? "/DemoWebsite" : "";\n\n`;

if (!content.includes('const basePath')) {
  content = prefix + content;
}

content = content.replace(/"\/venue\//g, '`${basePath}/venue/');
content = content.replace(/\.jpg"/g, '.jpg`');

fs.writeFileSync('lib/site.ts', content);
console.log("Successfully updated lib/site.ts");
