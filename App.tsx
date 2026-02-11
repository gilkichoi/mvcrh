
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import FeedbackForm from './components/FeedbackForm';
import DepartmentDetail from './components/DepartmentDetail';
import BookingModal from './components/BookingModal';
import TestimonialCarousel from './components/TestimonialCarousel';
import ResourcesPage from './components/ResourcesPage';
import SHAPage from './components/SHAPage';
import AdminDashboard from './components/AdminDashboard';
import { DEPARTMENTS as INITIAL_DEPARTMENTS, SERVICES as INITIAL_SERVICES, RESOURCES as INITIAL_RESOURCES, SOCIAL_LINKS as INITIAL_SOCIAL_LINKS } from './constants';
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

const ServiceSkeleton = () => (
  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex gap-6 animate-pulse">
    <div className="flex-shrink-0 w-12 h-12 bg-slate-200 rounded-2xl"></div>
    <div className="flex-1 space-y-4">
      <div className="flex justify-between items-start">
        <div className="h-5 bg-slate-200 rounded-md w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded-md w-16"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-100 rounded-md w-full"></div>
        <div className="h-4 bg-slate-100 rounded-md w-3/4"></div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  // Persistence state
  const [departments, setDepartments] = useState<DetailedDepartment[]>(() => {
    const saved = localStorage.getItem('hospital_departments');
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('hospital_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('hospital_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });
  const [feedback, setFeedback] = useState<FeedbackEntry[]>(() => {
    const saved = localStorage.getItem('hospital_feedback');
    return saved ? JSON.parse(saved) : [];
  });
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    const saved = localStorage.getItem('hospital_social_links');
    return saved ? JSON.parse(saved) : INITIAL_SOCIAL_LINKS;
  });

  const [selectedDept, setSelectedDept] = useState<DetailedDepartment | null>(null);
  const [isResourcesView, setIsResourcesView] = useState(false);
  const [isSHAView, setIsSHAView] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('is_admin_logged_in') === 'true');
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('hospital_departments', JSON.stringify(departments));
    localStorage.setItem('hospital_services', JSON.stringify(services));
    localStorage.setItem('hospital_resources', JSON.stringify(resources));
    localStorage.setItem('hospital_feedback', JSON.stringify(feedback));
    localStorage.setItem('hospital_social_links', JSON.stringify(socialLinks));
  }, [departments, services, resources, feedback, socialLinks]);

  useEffect(() => {
    // Simulate initial data loading to show skeletons
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 1200);

    const handleOpenBooking = (event: any) => {
      if (event.detail) {
        setBookingInitialData(event.detail);
      } else {
        setBookingInitialData(null);
      }
      setIsBookingOpen(true);
    };
    window.addEventListener('open-booking', handleOpenBooking);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-booking', handleOpenBooking);
    };
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
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleUpdateDepartment = (updatedDept: DetailedDepartment) => {
    setDepartments(prev => prev.map(d => d.id === updatedDept.id ? updatedDept : d));
    if (selectedDept?.id === updatedDept.id) {
      setSelectedDept(updatedDept);
    }
  };

  const filteredDepartments = useMemo(() => {
    return departments.filter(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, departments]);

  const handleAddFeedback = (newFeedback: FeedbackEntry) => {
    setFeedback(prev => [newFeedback, ...prev]);
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
                  Providing compassionate, accessible, and world-class healthcare to the residents of Voi and the greater Taita Taveta County since 1995.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button 
                    onClick={() => handleNavigate('departments')}
                    className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    Explore Departments
                  </button>
                  <button 
                    onClick={() => handleNavigate('sha')}
                    className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    SHA Health Cover Info
                  </button>
                </div>

                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
                  <div>
                    <p className="text-3xl font-bold text-teal-400">{departments.length * 20}+</p>
                    <p className="text-slate-400 text-sm">Bed Capacity</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-teal-400">{departments.length}+</p>
                    <p className="text-slate-400 text-sm">Specialized Clinics</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-teal-400">500+</p>
                    <p className="text-slate-400 text-sm">Daily Outpatients</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-teal-400">24/7</p>
                    <p className="text-slate-400 text-sm">Emergency Service</p>
                  </div>
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

            {/* About Us Section */}
            <section id="about" className="py-24 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-100 rounded-3xl -z-10 animate-pulse"></div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-100 rounded-3xl -z-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800" 
                      alt="Healthcare Professionals" 
                      className="rounded-3xl shadow-2xl border-8 border-white relative z-10 w-full object-cover aspect-video md:aspect-square"
                    />
                    <div className="absolute bottom-8 left-8 bg-teal-600 text-white p-6 rounded-2xl shadow-xl z-20 hidden md:block">
                      <p className="text-3xl font-bold mb-1">25+</p>
                      <p className="text-xs font-semibold uppercase tracking-widest text-teal-100">Years of Excellence</p>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Our Legacy</h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">A History of Compassionate Care in Taita Taveta</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      Moi Voi County Referral Hospital began as a humble medical outpost and has evolved into a premier health facility for the entire Coast region. As a Level 5 facility, we provide specialized services previously only available in major cities.
                    </p>
                    
                    {/* Testimonials Carousel Sub-section */}
                    <div className="mb-10">
                      <h4 className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-4">Patient Experiences</h4>
                      <TestimonialCarousel />
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex gap-4">
                        <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                          <i className="fa-solid fa-check text-xs"></i>
                        </div>
                        <p className="text-sm font-semibold text-slate-800">Advanced diagnostic capabilities and surgical expertise.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                          <i className="fa-solid fa-check text-xs"></i>
                        </div>
                        <p className="text-sm font-semibold text-slate-800">Patient-centered care with focus on affordability and quality.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                          <i className="fa-solid fa-check text-xs"></i>
                        </div>
                        <p className="text-sm font-semibold text-slate-800">24/7 emergency response and critical care services.</p>
                      </div>
                    </div>
                    <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2">
                      Read Our Mission <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Departments Section */}
            <section id="departments" className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Our Center of Excellence</h2>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Medical Departments</h3>
                  <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                    Specialized medical care delivered by a team of dedicated consultants, doctors, and nurses.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Search for a department (e.g. 'Maternity', 'Lab')..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {isDataLoading ? (
                    Array.from({ length: 6 }).map((_, i) => <DepartmentSkeleton key={i} />)
                  ) : filteredDepartments.length > 0 ? (
                    filteredDepartments.map((dept) => (
                      <div key={dept.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col animate-in fade-in zoom-in duration-300">
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={dept.image} 
                            alt={dept.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-xl flex items-center gap-2 shadow-sm">
                            <i className={`fa-solid ${dept.icon} text-teal-600`}></i>
                          </div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                          <h4 className="text-xl font-bold text-slate-900 mb-3">{dept.name}</h4>
                          <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                            {dept.description}
                          </p>
                          <button 
                            onClick={() => setSelectedDept(dept as DetailedDepartment)}
                            className="text-teal-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 rounded"
                          >
                            Learn More <i className="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200 animate-in fade-in duration-300">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <i className="fa-solid fa-folder-open text-3xl"></i>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">No departments found</h4>
                      <p className="text-slate-500">We couldn't find any results matching "{searchTerm}". Please try a different search term.</p>
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="mt-6 text-teal-600 font-bold hover:underline"
                      >
                        Clear search filter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <div className="max-w-xl">
                    <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Service Portfolio</h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">How We Serve Taita Taveta</h3>
                    <p className="mt-4 text-slate-600">
                      From critical emergency responses to preventive healthcare clinics, we are committed to the well-being of our community.
                    </p>
                  </div>
                  <a href="#contact" className="bg-white text-teal-600 border-2 border-teal-600 px-6 py-3 rounded-full font-bold hover:bg-teal-600 hover:text-white transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2">
                    Download Service Guide
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isDataLoading ? (
                    Array.from({ length: 4 }).map((_, i) => <ServiceSkeleton key={i} />)
                  ) : (
                    services.map((service: any) => (
                      <div key={service.id} className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-100 flex gap-6 hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                          <i className="fa-solid fa-check-circle text-xl"></i>
                        </div>
                        <div>
                          <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                            <h4 className="text-lg font-bold text-slate-900">{service.title}</h4>
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                              {service.available}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* Call to Action: Referral Section */}
            <section className="py-24 bg-teal-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-teal-500 rounded-full opacity-20"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-8 max-w-4xl mx-auto">
                  Ready to provide the best care for you and your family.
                </h2>
                <p className="text-teal-100 text-lg mb-12 max-w-2xl mx-auto">
                  Our hospital accepts various insurances including SHA (formerly NHIF) and major private providers. We are the primary referral center for the lower Coast region.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => {
                      setBookingInitialData(null);
                      setIsBookingOpen(true);
                    }}
                    className="bg-white text-teal-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-600"
                  >
                    <i className="fa-solid fa-phone"></i> Call Emergency Desk
                  </button>
                  <button className="bg-teal-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-teal-800 transition-all flex items-center justify-center gap-2 border border-teal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-600">
                    <i className="fa-solid fa-map-location-dot"></i> Get Directions
                  </button>
                </div>
              </div>
            </section>

            {/* Contact & Feedback Section */}
            <section id="contact" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                  <div>
                    <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Get in Touch</h2>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-8">Contact Information</h3>
                    
                    <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-teal-600 flex-shrink-0">
                          <i className="fa-solid fa-location-dot text-xl"></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Location</h4>
                          <p className="text-slate-600 text-sm">Voi Town, Behind the Sub-County Offices, Voi, Taita Taveta County.</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-teal-600 flex-shrink-0">
                          <i className="fa-solid fa-phone-volume text-xl"></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Phone & Mobile</h4>
                          <p className="text-slate-600 text-sm">+254 712 345 678 (Reception)</p>
                          <p className="text-slate-600 text-sm">+254 722 000 000 (A&E Emergency)</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-teal-600 flex-shrink-0">
                          <i className="fa-solid fa-envelope text-xl"></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Email Address</h4>
                          <a href="mailto:info@mvcrh.or.ke" className="text-teal-600 text-sm font-bold hover:underline">info@mvcrh.or.ke</a>
                          <p className="text-slate-600 text-sm mt-1">records@taitataveta.go.ke</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 p-8 bg-teal-50 rounded-3xl border border-teal-100">
                      <h4 className="font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-clock"></i> Visiting Hours
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-teal-800">Morning</p>
                          <p className="text-teal-600">6:00 AM - 7:30 AM</p>
                        </div>
                        <div>
                          <p className="font-semibold text-teal-800">Noon</p>
                          <p className="text-teal-600">1:00 PM - 2:00 PM</p>
                        </div>
                        <div className="col-span-2">
                          <p className="font-semibold text-teal-800">Evening</p>
                          <p className="text-teal-600">4:30 PM - 6:30 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-100 rounded-3xl overflow-hidden min-h-[400px] border border-slate-200 group relative">
                    <iframe 
                      title="Moi Voi County Referral Hospital Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15911.75130752538!2d38.56064115!3d-3.39088865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1838865e90d7973d%3A0xc3124586940e4f3c!2sMoi%20County%20Referral%20Hospital%2C%20Voi!5e0!3m2!1sen!2ske!4v1715421234567!5m2!1sen!2ske" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    ></iframe>
                    <div className="absolute bottom-6 right-6 z-10">
                      <a 
                        href="https://maps.app.goo.gl/t9pA7XG9wz7jMvC68" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-teal-600 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-teal-600 hover:text-white transition-all transform hover:scale-105"
                      >
                        <i className="fa-solid fa-diamond-turn-right"></i> Get Directions
                      </a>
                    </div>
                  </div>
                </div>

                {/* Dedicated Feedback Form */}
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-slate-900"> We Value Your Feedback</h3>
                    <p className="text-slate-600 mt-2">Help us serve you better by sharing your experience or suggesting improvements.</p>
                  </div>
                  <FeedbackForm onSubmit={handleAddFeedback} />
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 flex items-center justify-center p-1 bg-white rounded-xl shadow-inner">
                  <img 
                    src="logo.png" 
                    alt="Taita Taveta County Logo" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-white font-extrabold text-xl block leading-tight tracking-tight">Moi Voi</span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] block">County Referral Hospital</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-8 text-slate-400">
                The leading healthcare provider in Taita Taveta County, committed to excellence in medical services and patient care.
              </p>
              <div className="flex gap-4">
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2">
                    <i className="fa-brands fa-facebook-f text-white text-sm"></i>
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2">
                    <i className="fa-brands fa-x-twitter text-white text-sm"></i>
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2">
                    <i className="fa-brands fa-instagram text-white text-sm"></i>
                  </a>
                )}
                {socialLinks.youtube && (
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2">
                    <i className="fa-brands fa-youtube text-white text-sm"></i>
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2">
                    <i className="fa-brands fa-linkedin-in text-white text-sm"></i>
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest">Quick Navigation</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => handleNavigate('home')} className="hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded px-1">Home Portal</button></li>
                <li><button onClick={() => handleNavigate('about')} className="hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded px-1">About Our History</button></li>
                <li><button onClick={() => handleNavigate('departments')} className="hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded px-1">Medical Departments</button></li>
                <li><button onClick={() => handleNavigate('sha')} className="hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded px-1">SHA Transition Info</button></li>
                <li><button onClick={() => handleNavigate('resources')} className="hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded px-1">Public Documents</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest">Specialties</h4>
              <ul className="space-y-4 text-sm">
                {departments.slice(0, 5).map(dept => (
                  <li key={dept.id}>
                    <button 
                      onClick={() => setSelectedDept(dept)} 
                      className="hover:text-teal-400 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded px-1"
                    >
                      {dept.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest">Official Contact</h4>
              <p className="text-xs mb-6 text-slate-500 font-medium">Official correspondence for the Referral Hospital.</p>
              <ul className="space-y-5 text-sm">
                <li><a href="mailto:info@mvcrh.or.ke" className="flex items-center gap-3 hover:text-teal-400 transition-colors"><i className="fa-solid fa-envelope text-teal-600"></i> info@mvcrh.or.ke</a></li>
                <li><a href="https://sha.go.ke" target="_blank" className="flex items-center gap-3 hover:text-teal-400 transition-colors"><i className="fa-solid fa-shield-heart text-teal-600"></i> SHA Official Website</a></li>
                <li><a href="https://www.health.go.ke" target="_blank" className="flex items-center gap-3 hover:text-teal-400 transition-colors"><i className="fa-solid fa-building-columns text-teal-600"></i> Ministry of Health</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">
            <p>© 2024 Moi Voi County Referral Hospital. Empowering Taita Taveta.</p>
            <div className="flex gap-8">
              <button onClick={() => handleNavigate('admin')} className="hover:text-white transition-colors">Staff Access</button>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Compliance</a>
            </div>
            <p className="text-teal-600">Owned by Taita Taveta County Govt</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget Component */}
      <ChatWidget departments={departments} />

      {/* Booking Modal */}
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
