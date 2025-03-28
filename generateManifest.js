const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');
const version = packageJson.version;

const templatePath = path.join(__dirname, 'src', 'manifest.template.json');
const manifestTemplate = fs.readFileSync(templatePath, 'utf8');

const manifestContent = manifestTemplate.replace(/__VERSION__/g, version);

const outputPath = path.join(__dirname, 'public', 'manifest.json');
fs.writeFileSync(outputPath, manifestContent);

console.log('manifest.json generated with version:', version);
