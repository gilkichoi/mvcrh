const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

const mainStart = '<main className="flex-grow">';
const mainEnd = '</main>';

const startIdx = code.indexOf(mainStart) + mainStart.length;
const endIdx = code.indexOf(mainEnd);

const newRender = `
        {selectedDept ? (
          <DepartmentDetail 
            department={selectedDept} 
            onBack={() => setSelectedDept(null)}
            onNavigate={(dept) => {
              setSelectedDept(dept);
            }}
            onNavigateToSection={handleNavigate}
            allDepartments={departments}
            onUpdateDepartment={handleUpdateDepartment}
          />
        ) : currentView === 'resources' ? (
          <ResourcesPage resources={resources} />
        ) : currentView === 'sha' ? (
          <SHAPage />
        ) : currentView === 'departments' ? (
          <DepartmentsPage departments={departments} isDataLoading={isDataLoading} setSelectedDept={setSelectedDept} />
        ) : currentView === 'services' ? (
          <ServicesPage services={services} />
        ) : currentView === 'about' ? (
          <AboutPage />
        ) : currentView === 'contact' ? (
          <ContactPage />
        ) : currentView === 'blog' ? (
          <BlogPage />
        ) : currentView === 'news' ? (
          <NewsSection />
        ) : currentView === 'campus-map' ? (
          <CampusMap />
        ) : (
          <>
            <HomePage onNavigate={handleNavigate} />
            {/* Feedback Form */}
            <section className="py-24 bg-white border-t border-slate-100">
              <div className="max-w-4xl mx-auto px-4 text-center">
                 <h2 className="text-3xl font-black mb-8 text-slate-900">Share Your Experience</h2>
                 <FeedbackForm onSubmit={handleAddFeedback} />
              </div>
            </section>
          </>
        )}
      `;

code = code.substring(0, startIdx) + newRender + code.substring(endIdx);
fs.writeFileSync('App.tsx', code);
