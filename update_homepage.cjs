const fs = require('fs');
let code = fs.readFileSync('components/HomePage.tsx', 'utf8');

code = code.replace(
  /<div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">\s*<FeedbackForm onSubmit=\{onAddFeedback\} \/>\s*<\/div>/,
  '<FeedbackForm onSubmit={onAddFeedback} />'
);

fs.writeFileSync('components/HomePage.tsx', code);
