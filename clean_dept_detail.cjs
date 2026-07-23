const fs = require('fs');

let code = fs.readFileSync('components/DepartmentDetail.tsx', 'utf8');

// Remove add event block
const handleAddEventRegex = /const handleAddEvent = \([\s\S]*?\}\s*};\s*};/m;
code = code.replace(handleAddEventRegex, '');
const validateEventRegex = /const validateEventForm = \([\s\S]*?\};\s*};/m;
code = code.replace(validateEventRegex, '');
const fileUploadRegex = /const handleFileUpload = \([\s\S]*?\};\s*};/m;
code = code.replace(fileUploadRegex, '');

// Clean the "New Event Form" section
const eventFormRegex = /\{\/\* New Event Form \*\/\}\s*<div className="[\s\S]*?<\/form>\s*<\/div>/m;
code = code.replace(eventFormRegex, '');

const uploadControlsRegex = /<input\s*type="file"[\s\S]*?aria-label="Next image"\s*>\s*<i className="fa-solid fa-chevron-right"><\/i>\s*<\/button>\s*<\/div>/m;
code = code.replace(uploadControlsRegex, `
<div className="flex gap-2">
  <button 
    onClick={prevImage}
    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
    aria-label="Previous image"
  >
    <i className="fa-solid fa-chevron-left"></i>
  </button>
  <button 
    onClick={nextImage}
    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
    aria-label="Next image"
  >
    <i className="fa-solid fa-chevron-right"></i>
  </button>
</div>
`);

const fallbackUploadRegex = /<p className="font-medium">No gallery images yet\. Start by uploading some\.<\/p>\s*<button[\s\S]*?Upload first photo\s*<\/button>/m;
code = code.replace(fallbackUploadRegex, `<p className="font-medium">No gallery images available.</p>`);

// Also remove "Add Event" button
const addEventButtonRegex = /<button\s*onClick=\{[^}]+\}\s*className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1\.5 rounded-lg hover:bg-teal-100 transition-colors"\s*>\s*<i className="fa-solid fa-plus mr-1"><\/i>\s*Add Event\s*<\/button>/m;
code = code.replace(addEventButtonRegex, '');

fs.writeFileSync('components/DepartmentDetail.tsx', code);
