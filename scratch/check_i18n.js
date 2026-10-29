const fs = require('fs');
const path = require('path');

const langCode = fs.readFileSync(path.join(__dirname, '../public/js/lang.js'), 'utf8');
const files = fs.readdirSync(path.join(__dirname, '../public')).filter(f => f.endsWith('.html'));

const usedKeys = new Set();
files.forEach(f => {
  const content = fs.readFileSync(path.join(__dirname, '../public', f), 'utf8');
  const matches = content.match(/data-i18n(?:-placeholder)?="([^"]+)"/g) || [];
  matches.forEach(m => {
    const k = m.split('"')[1];
    usedKeys.add(k);
  });
});

console.log('Total unique i18n keys used in HTML:', usedKeys.size);

const missing = [];
usedKeys.forEach(k => {
  const regex = new RegExp(`['"]?${k}['"]?\\s*:`, 'm');
  if (!regex.test(langCode)) {
    missing.push(k);
  }
});

console.log('Missing keys in lang.js count:', missing.length);
if (missing.length > 0) {
  console.log('Missing keys:', missing);
}
