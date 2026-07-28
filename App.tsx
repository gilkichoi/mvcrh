
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import AccessibilityWidget from './components/AccessibilityWidget';
import FeedbackForm from './components/FeedbackForm';
import DepartmentDetail from './components/DepartmentDetail';
import BookingModal from './components/BookingModal';
import ResourcesPage from './components/ResourcesPage';
import SHAPage from './components/SHAPage';
import AdminDashboard from './components/AdminDashboard';
import NewsSection from './components/NewsSection';
import CampusMap from "./components/CampusMap";
import HomePage from './components/HomePage';
import DepartmentsPage from './components/DepartmentsPage';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { DEPARTMENTS as INITIAL_DEPARTMENTS, SERVICES as INITIAL_SERVICES, RESOURCES as INITIAL_RESOURCES, SOCIAL_LINKS as INITIAL_SOCIAL_LINKS, NEWS as INITIAL_NEWS, EVENTS as INITIAL_EVENTS } from './constants';
import { FeedbackEntry, DetailedDepartment, SocialLinks } from './types';

const DepartmentSkeleton = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col animate-pulse">
    <div className="h-48 bg-slate-200"></div>
    <div className="p-8 flex-1 flex flex-col gap-4">
      <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-100 rounded-md w-full"></div>
        <div className="h-4 bg-slate-100 rounded-md w-5/6"></div>
      </div>
      <div className="h-4 bg-slate-200 rounded-md w-1/4 mt-auto"></div>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [departments, setDepartments] = useState<DetailedDepartment[]>(INITIAL_DEPARTMENTS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(INITIAL_SOCIAL_LINKS);
  const [newsItems, setNewsItems] = useState(INITIAL_NEWS);
  const [eventItems, setEventItems] = useState(INITIAL_EVENTS);

  const [selectedDept, setSelectedDept] = useState<DetailedDepartment | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('is_admin_logged_in') === 'true');
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Laravel API Base URL
  const apiBase = '/api/v1';

  useEffect(() => {
    const fetchHospitalData = async () => {
      setIsDataLoading(true);
      try {
        const response = await fetch(`${apiBase}/departments`);
        if (response.ok) {
          const json = await response.json();
          if (json.data && json.data.length > 0) {
            setDepartments(json.data);
          }
        }
      } catch (error) {
        console.warn('Laravel API offline, using local fallbacks');
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchHospitalData();

    const handleOpenBooking = (event: any) => {
      setBookingInitialData(event.detail || null);
      setIsBookingOpen(true);
    };
    window.addEventListener('open-booking', handleOpenBooking);
    return () => window.removeEventListener('open-booking', handleOpenBooking);
  }, []);

  const handleNavigate = (view: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedDept(null);
    setCurrentView(view);
  };

  const handleUpdateDepartment = (updatedDept: DetailedDepartment) => {
    setDepartments(prev => prev.map(d => d.id === updatedDept.id ? updatedDept : d));
  };

  const filteredDepartments = useMemo(() => {
    return departments.filter(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, departments]);

  const handleAddFeedback = async (newFeedback: FeedbackEntry) => {
    try {
      const res = await fetch(`${apiBase}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedback)
      });
      if (res.ok) {
        setFeedback(prev => [newFeedback, ...prev]);
      }
    } catch (e) {
      setFeedback(prev => [newFeedback, ...prev]); // Local fallback
    }
  };

  if (currentView === 'admin') {
    return (
      <AdminDashboard 
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
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <Navbar onNavigate={handleNavigate} isLoggedIn={isLoggedIn} onAdminClick={() => handleNavigate('admin')} departments={departments} socialLinks={socialLinks} />

      <main className="flex-grow">
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
            <HomePage onNavigate={handleNavigate} departments={departments} onAddFeedback={handleAddFeedback} newsItems={newsItems} eventItems={eventItems} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <a 
              href="https://www.facebook.com/people/Moi-County-Referral-Hospital-Voi/100089810477442/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-md"
            >
              <i className="fa-brands fa-facebook text-sm"></i>
              <span>Official Facebook Page: Moi County Referral Hospital - Voi</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
          <p className="text-xs uppercase tracking-widest font-bold">{t('common.copyright', '© 2026 Moi Voi County Referral Hospital')}</p>
          <div className="flex justify-center gap-6 mt-6">
             <button onClick={() => handleNavigate('admin')} className="hover:text-white transition-colors">{t('common.adminDashboard', 'Admin Dashboard')}</button>
             <button onClick={() => handleNavigate('resources')} className="hover:text-white transition-colors">{t('nav.resources', 'Resources')}</button>
             <button onClick={() => handleNavigate('news')} className="hover:text-white transition-colors">{t('nav.news', 'Facebook & News Feed')}</button>
          </div>
        </div>
      </footer>

      <AccessibilityWidget />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingInitialData}
        departments={departments}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
