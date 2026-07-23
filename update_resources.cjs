const fs = require('fs');

const path = './components/ResourcesPage.tsx';
let content = fs.readFileSync(path, 'utf8');

const faqs = `
      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 mt-16">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "What are the general visitation hours?",
              a: "General visitation hours are from 12:30 PM to 2:00 PM and from 4:30 PM to 5:30 PM daily. Please note that special units like the Newborn Unit have restricted visiting hours."
            },
            {
              q: "Does the hospital accept SHA (Social Health Authority) insurance?",
              a: "Yes, we accept SHA insurance for a wide range of inpatient and outpatient services. Please present a valid SHA card at the revenue or admission office to facilitate pre-authorization and claims processing."
            },
            {
              q: "What documents do I need to bring for admission?",
              a: "You should bring your national ID or passport, your hospital file (if you have one), a valid SHA cover or other insurance cards, and any referral letters or doctor's requests you were given."
            },
            {
              q: "How do I clear my hospital bill?",
              a: "Hospital bills and mortuary fees can be cleared at the Cash Office. Please ensure you present the necessary documents, such as discharge summaries or burial permits, to complete the process."
            },
            {
              q: "Are emergency services available 24/7?",
              a: "Yes, our Emergency Unit and Theatre handle life-threatening conditions and emergency surgeries 24 hours a day, 7 days a week."
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-3">
                <i className="fa-solid fa-circle-question text-teal-600 mt-1"></i> {faq.q}
              </h3>
              <p className="text-slate-600 pl-8 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
`;

// Insert the FAQ section right before the Help Section
const helpSectionIndex = content.indexOf('{/* Help Section */}');

if (helpSectionIndex !== -1) {
    content = content.slice(0, helpSectionIndex) + faqs + '\n      ' + content.slice(helpSectionIndex);
    fs.writeFileSync(path, content);
    console.log('Successfully added FAQ section to ResourcesPage.tsx');
} else {
    console.log('Help Section not found in ResourcesPage.tsx');
}
