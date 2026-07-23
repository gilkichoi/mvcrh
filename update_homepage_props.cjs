const fs = require('fs');
let code = fs.readFileSync('components/HomePage.tsx', 'utf8');

const importRegex = /import \{ DetailedDepartment \} from '\.\.\/types';/;
code = code.replace(importRegex, "import { DetailedDepartment, NewsItem, EventItem } from '../types';");

const interfaceRegex = /interface HomePageProps \{[\s\S]*?\}/;
const newInterface = `interface HomePageProps {
  onNavigate: (view: string) => void;
  departments: DetailedDepartment[];
  onAddFeedback: (feedback: any) => Promise<void>;
  newsItems: NewsItem[];
  eventItems: EventItem[];
}`;
code = code.replace(interfaceRegex, newInterface);

code = code.replace(/const HomePage: React\.FC<HomePageProps> = \(\{ onNavigate, departments, onAddFeedback \}\) => \{/, 'const HomePage: React.FC<HomePageProps> = ({ onNavigate, departments, onAddFeedback, newsItems, eventItems }) => {');

// Remove hardcoded newsItems and eventItems inside HomePage.tsx
code = code.replace(/const newsItems = \[[\s\S]*?\];/, '');
code = code.replace(/const eventItems = \[[\s\S]*?\];/, '');

fs.writeFileSync('components/HomePage.tsx', code);
