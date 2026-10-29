const fs = require('fs');
const files = ['knowledgehub.html','crop-guides.html','disease-guide.html','fertilizer-guide.html','seasonal-advisory.html','crop-calendar.html','marketpalce.html'];
files.forEach(f => {
  const c = fs.readFileSync('./public/'+f,'utf8');
  const footerIdx = c.indexOf('<footer');
  if (footerIdx !== -1) {
    const snippet = c.substring(footerIdx, footerIdx + 200);
    console.log(f.padEnd(25), snippet.substring(0, 120));
  } else {
    console.log(f.padEnd(25), 'NO FOOTER FOUND');
  }
});
