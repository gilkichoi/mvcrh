const fs = require('fs');
let code = fs.readFileSync('components/DepartmentDetail.tsx', 'utf8');

const regex = /const handleAddEvent = \([\s\S]*?\}\s*};\s*/;
code = code.replace(regex, '');

const uploadRegex = /const handleFileUpload = \([\s\S]*?\};\s*};\s*/;
code = code.replace(uploadRegex, '');

fs.writeFileSync('components/DepartmentDetail.tsx', code);
