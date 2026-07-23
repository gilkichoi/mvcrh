const fs = require('fs');

let code = fs.readFileSync('components/DepartmentDetail.tsx', 'utf8');

// The file still contains showEventForm, newEvent, handleAddEvent, etc.
// Let's replace the whole events section.

const eventFormBlockRegex = /<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">[\s\S]*?<\/div>[\s\S]*?\{showEventForm && \([\s\S]*?<\/div>\s*\)\}/m;

code = code.replace(eventFormBlockRegex, `<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h3 id="dept-events-heading" className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <i className="fa-solid fa-calendar-day text-teal-700" aria-hidden="true"></i> Upcoming Events & Specialized Clinics
                </h3>
              </div>`);

const emptyEventsRegex = /<button\s*onClick=\{[^}]*\}\s*className="mt-4 text-teal-600 font-bold text-sm underline hover:text-teal-800"\s*>\s*Add the first event\s*<\/button>/m;
code = code.replace(emptyEventsRegex, '');

// Removing the states if possible: showEventForm, newEvent, errors, isSubmittingEvent, localEvents
code = code.replace(/const \[showEventForm, setShowEventForm\] = useState\(false\);/, '');
code = code.replace(/const \[newEvent, setNewEvent\] = useState<DepartmentEvent>\(\{[\s\S]*?\}\);/, '');
code = code.replace(/const \[errors, setErrors\] = useState<FormErrors>\(\{\}\);/, '');
code = code.replace(/const \[isSubmittingEvent, setIsSubmittingEvent\] = useState\(false\);/, '');

const handleAddEventFuncRegex = /const handleAddEvent = \([\s\S]*?\}\s*};\s*};\s*/m;
code = code.replace(handleAddEventFuncRegex, '');
const validateFuncRegex = /const validateEventForm = \([\s\S]*?return Object\.keys\(newErrors\)\.length === 0;\s*};\s*/m;
code = code.replace(validateFuncRegex, '');


fs.writeFileSync('components/DepartmentDetail.tsx', code);
