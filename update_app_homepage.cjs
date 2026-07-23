const fs = require('fs');

let code = fs.readFileSync('App.tsx', 'utf8');

const oldRender = `<HomePage onNavigate={handleNavigate} departments={departments} />
            {/* Feedback Form */}
            <section className="py-24 bg-white border-t border-slate-100">
              <div className="max-w-4xl mx-auto px-4 text-center">
                 <h2 className="text-3xl font-black mb-8 text-slate-900">Share Your Experience</h2>
                 <FeedbackForm onSubmit={handleAddFeedback} />
              </div>
            </section>`;

const newRender = `<HomePage onNavigate={handleNavigate} departments={departments} onAddFeedback={handleAddFeedback} />`;

code = code.replace(oldRender, newRender);
fs.writeFileSync('App.tsx', code);
