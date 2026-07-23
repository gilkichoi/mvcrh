const fs = require('fs');

let code = fs.readFileSync('App.tsx', 'utf8');

const regex = /<AdminDashboard[\s\S]*?\/>/;
const newAdmin = `<AdminDashboard 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        departments={departments}
        setDepartments={setDepartments}
        services={services}
        setServices={setServices}
        resources={resources}
        setResources={setResources}
        feedback={feedback}
        setFeedback={setFeedback}
        socialLinks={socialLinks}
        setSocialLinks={setSocialLinks}
        newsItems={newsItems}
        setNewsItems={setNewsItems}
        eventItems={eventItems}
        setEventItems={setEventItems}
        onExit={() => handleNavigate('home')}
      />`;

code = code.replace(regex, newAdmin);

fs.writeFileSync('App.tsx', code);
