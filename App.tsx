
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar.tsx';
import ChatWidget from './components/ChatWidget.tsx';
import FeedbackForm from './components/FeedbackForm.tsx';
import DepartmentDetail from './components/DepartmentDetail.tsx';
import BookingModal from './components/BookingModal.tsx';
import TestimonialCarousel from './components/TestimonialCarousel.tsx';
import ResourcesPage from './components/ResourcesPage.tsx';
import SHAPage from './components/SHAPage.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import { DEPARTMENTS as INITIAL_DEPARTMENTS, SERVICES as INITIAL_SERVICES, RESOURCES as INITIAL_RESOURCES, SOCIAL_LINKS as INITIAL_SOCIAL_LINKS } from './constants.tsx';
import { FeedbackEntry, DetailedDepartment, SocialLinks } from './types.ts';

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

const App: React.FC = () => {
  const [departments, setDepartments] = useState<DetailedDepartment[]>(INITIAL_DEPARTMENTS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(INITIAL_SOCIAL_LINKS);

  const [selectedDept, setSelectedDept] = useState<DetailedDepartment | null>(null);
  const [isResourcesView, setIsResourcesView] = useState(false);
  const [isSHAView, setIsSHAView] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
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
    setIsAdminView(false);
    if (view === 'resources') {
      setSelectedDept(null);
      setIsSHAView(false);
      setIsResourcesView(true);
    } else if (view === 'sha') {
      setSelectedDept(null);
      setIsResourcesView(false);
      setIsSHAView(true);
    } else if (view === 'admin') {
      setIsAdminView(true);
      setSelectedDept(null);
      setIsResourcesView(false);
      setIsSHAView(false);
    } else {
      setIsResourcesView(false);
      setIsSHAView(false);
      setSelectedDept(null);
      setTimeout(() => {
        const element = document.getElementById(view);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
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

  if (isAdminView) {
    return (
      <AdminDashboard 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={(val) => {
          setIsLoggedIn(val);
          localStorage.setItem('is_admin_logged_in', val.toString());
        }}
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
        onExit={() => setIsAdminView(false)}
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
              setIsResourcesView(false);
              setIsSHAView(false);
              setSelectedDept(dept);
            }}
            onNavigateToSection={handleNavigate}
            allDepartments={departments}
            onUpdateDepartment={handleUpdateDepartment}
          />
        ) : isResourcesView ? (
          <ResourcesPage resources={resources} />
        ) : isSHAView ? (
          <SHAPage />
        ) : (
          <>
            {/* Hero Section */}
            <section id="home" className="relative bg-slate-900 text-white overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-40">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920" 
                  alt="Hospital Exterior" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-transparent z-10"></div>
              
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 bg-teal-600/30 backdrop-blur-md px-4 py-2 rounded-full border border-teal-400/30 mb-6 animate-in fade-in slide-in-from-left duration-700">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-teal-100">24/7 Emergency Care Available</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
                  Moi Voi <span className="text-teal-400">County Referral Hospital</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light">
                  Serving Taita Taveta with a state-of-the-art database-backed medical portal for efficient patient care.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button 
                    onClick={() => handleNavigate('departments')}
                    className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all text-center"
                  >
                    Explore Departments
                  </button>
                  <button 
                    onClick={() => handleNavigate('sha')}
                    className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center"
                  >
                    SHA Health Cover Info
                  </button>
                </div>
              </div>
            </section>

            {/* Quick Links / Alert Bar */}
            <div className="bg-teal-50 py-4 border-y border-teal-100">
              <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 text-sm font-medium text-teal-900">
                <span className="flex items-center gap-2 cursor-pointer hover:text-teal-600" onClick={() => handleNavigate('sha')}>
                  <i className="fa-solid fa-shield-heart"></i> Register for SHA: Dial *147#
                </span>
                <span className="flex items-center gap-2"><i className="fa-solid fa-phone"></i> Emergency: +254 722 000 000</span>
                <span className="flex items-center gap-2"><i className="fa-solid fa-location-dot"></i> Voi Town, Off Nairobi-Mombasa Highway</span>
              </div>
            </div>

            {/* Departments Section */}
            <section id="departments" className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Our Center of Excellence</h2>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Medical Departments</h3>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Search for a department..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {isDataLoading ? (
                    Array.from({ length: 6 }).map((_, i) => <DepartmentSkeleton key={i} />)
                  ) : (
                    filteredDepartments.map((dept) => (
                      <div key={dept.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={dept.image} 
                            alt={dept.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                          <h4 className="text-xl font-bold text-slate-900 mb-3">{dept.name}</h4>
                          <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                            {dept.description}
                          </p>
                          <button 
                            onClick={() => setSelectedDept(dept as DetailedDepartment)}
                            className="text-teal-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                          >
                            Learn More <i className="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                   <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Patient Voices</h2>
                   <h3 className="text-3xl font-black text-slate-900">What the Community Says</h3>
                </div>
                <TestimonialCarousel />
              </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                        <i className="fa-solid fa-check-circle text-xl"></i>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Feedback Form */}
            <section className="py-24 bg-white">
              <div className="max-w-4xl mx-auto px-4 text-center">
                 <h2 className="text-3xl font-black mb-8">Share Your Experience</h2>
                 <FeedbackForm onSubmit={handleAddFeedback} />
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest font-bold">© 2024 Moi Voi County Referral Hospital</p>
          <div className="flex justify-center gap-6 mt-6">
             <button onClick={() => handleNavigate('admin')} className="hover:text-white transition-colors">Admin Dashboard</button>
             <button onClick={() => handleNavigate('resources')} className="hover:text-white transition-colors">Resources</button>
          </div>
        </div>
      </footer>

      <ChatWidget departments={departments} />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingInitialData}
        departments={departments}
      />
    </div>
  );
};

export default App;
