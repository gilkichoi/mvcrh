const fs = require('fs');

let code = fs.readFileSync('App.tsx', 'utf8');

const oldImport = `import { DEPARTMENTS as INITIAL_DEPARTMENTS, SERVICES as INITIAL_SERVICES, RESOURCES as INITIAL_RESOURCES, SOCIAL_LINKS as INITIAL_SOCIAL_LINKS } from './constants';`;
const newImport = `import { DEPARTMENTS as INITIAL_DEPARTMENTS, SERVICES as INITIAL_SERVICES, RESOURCES as INITIAL_RESOURCES, SOCIAL_LINKS as INITIAL_SOCIAL_LINKS, NEWS as INITIAL_NEWS, EVENTS as INITIAL_EVENTS } from './constants';`;
code = code.replace(oldImport, newImport);

const oldState = `const [socialLinks, setSocialLinks] = useState<SocialLinks>(INITIAL_SOCIAL_LINKS);`;
const newState = `const [socialLinks, setSocialLinks] = useState<SocialLinks>(INITIAL_SOCIAL_LINKS);
  const [newsItems, setNewsItems] = useState(INITIAL_NEWS);
  const [eventItems, setEventItems] = useState(INITIAL_EVENTS);`;
code = code.replace(oldState, newState);

const oldAdmin = `<AdminDashboard 
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
        onExit={() => handleNavigate('home')}
      />`;
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
code = code.replace(oldAdmin, newAdmin);

const oldHomePage = `<HomePage onNavigate={handleNavigate} departments={departments} onAddFeedback={handleAddFeedback} />`;
const newHomePage = `<HomePage onNavigate={handleNavigate} departments={departments} onAddFeedback={handleAddFeedback} newsItems={newsItems} eventItems={eventItems} />`;
code = code.replace(oldHomePage, newHomePage);

// Footer date change
code = code.replace(/© 2024 Moi Voi/g, '© 2026 Moi Voi');

fs.writeFileSync('App.tsx', code);
