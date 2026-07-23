const fs = require('fs');

let code = fs.readFileSync('components/AdminDashboard.tsx', 'utf8');

const oldImport = `import { DetailedDepartment, HospitalService, Resource, FeedbackEntry, SocialLinks } from '../types';`;
const newImport = `import { DetailedDepartment, HospitalService, Resource, FeedbackEntry, SocialLinks, NewsItem, EventItem } from '../types';`;
code = code.replace(oldImport, newImport);

const oldProps = `interface AdminDashboardProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  departments: DetailedDepartment[];
  setDepartments: React.Dispatch<React.SetStateAction<DetailedDepartment[]>>;
  services: HospitalService[];
  setServices: React.Dispatch<React.SetStateAction<HospitalService[]>>;
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  feedback: FeedbackEntry[];
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackEntry[]>>;
  socialLinks: SocialLinks;
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLinks>>;
  onExit: () => void;
}`;

const newProps = `interface AdminDashboardProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  departments: DetailedDepartment[];
  setDepartments: React.Dispatch<React.SetStateAction<DetailedDepartment[]>>;
  services: HospitalService[];
  setServices: React.Dispatch<React.SetStateAction<HospitalService[]>>;
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  feedback: FeedbackEntry[];
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackEntry[]>>;
  socialLinks: SocialLinks;
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLinks>>;
  newsItems: NewsItem[];
  setNewsItems: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  eventItems: EventItem[];
  setEventItems: React.Dispatch<React.SetStateAction<EventItem[]>>;
  onExit: () => void;
}`;
code = code.replace(oldProps, newProps);

const oldDestructure = `const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isLoggedIn,
  setIsLoggedIn,
  departments,
  setDepartments,
  services,
  setServices,
  resources,
  setResources,
  feedback,
  setFeedback,
  socialLinks,
  setSocialLinks,
  onExit
}) => {`;

const newDestructure = `const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isLoggedIn,
  setIsLoggedIn,
  departments,
  setDepartments,
  services,
  setServices,
  resources,
  setResources,
  feedback,
  setFeedback,
  socialLinks,
  setSocialLinks,
  newsItems,
  setNewsItems,
  eventItems,
  setEventItems,
  onExit
}) => {`;
code = code.replace(oldDestructure, newDestructure);

const oldTabs = `const [activeTab, setActiveTab] = useState<'departments' | 'services' | 'resources' | 'feedback' | 'settings'>('departments');`;
const newTabs = `const [activeTab, setActiveTab] = useState<'departments' | 'services' | 'resources' | 'feedback' | 'settings' | 'news' | 'events'>('departments');`;
code = code.replace(oldTabs, newTabs);

fs.writeFileSync('components/AdminDashboard.tsx', code);
