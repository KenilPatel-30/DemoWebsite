const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const nextDir = path.join(outDir, '_next');
const targetDir = path.join(outDir, 'assets');

if (fs.existsSync(nextDir)) {
  fs.renameSync(nextDir, targetDir);
}

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else {
      const ext = path.extname(fullPath);
      if (['.html', '.js', '.css', '.txt', '.json'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        // Replace absolute paths
        let newContent = content.replace(/\/_next\//g, '/assets/');
        // Replace encoded absolute paths that might be in JS strings
        newContent = newContent.replace(/\\\/_next\\\//g, '\\/assets\\/');
        // Replace relative paths if any (e.g. in CSS)
        newContent = newContent.replace(/\.\.\/_next\//g, '../assets/');
        
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
        }
      }
    }
  }
}

replaceInDir(outDir);
console.log("Successfully replaced _next with assets.");
