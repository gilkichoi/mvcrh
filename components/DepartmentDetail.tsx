
import React, { useEffect, useState, useRef } from 'react';
import { DetailedDepartment, DepartmentEvent, GalleryImage } from '../types';

interface DepartmentDetailProps {
  department: DetailedDepartment;
  onBack: () => void;
  onNavigate: (dept: DetailedDepartment) => void;
  onNavigateToSection: (id: string) => void;
  allDepartments: DetailedDepartment[];
  onUpdateDepartment: (dept: DetailedDepartment) => void;
}

interface FormErrors {
  title?: string;
  date?: string;
  time?: string;
  description?: string;
}

const DepartmentDetail: React.FC<DepartmentDetailProps> = ({ department, onBack, onNavigate, onNavigateToSection, allDepartments, onUpdateDepartment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [localEvents, setLocalEvents] = useState<DepartmentEvent[]>(department.events || []);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set());
  const [isUploading, setIsUploading] = useState(false);
  
  
  
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calendar States
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const shareMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocalEvents(department.events || []);
    
    
    setCurrentImageIndex(0);
    setSelectedDate(null);
    setSelectedTime(null);
    setExpandedEvents(new Set());
  }, [department]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (department.galleryImages.length > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % department.galleryImages.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [department.galleryImages.length]);

  const COMMON_SERVICES = [
    'Immunization Clinics',
    'Family Planning Services',
    'Antenatal & Postnatal Care',
    'Triage & Basic Emergencies',
    'General Medical Consultations',
    'Emergency Trauma Surgery',
    'Medication Counseling',
    'Specialized Clinic Referrals'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newGalleryImages: GalleryImage[] = [];
    let processedCount = 0;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        newGalleryImages.push({
          url: result,
          alt: file.name,
          caption: `Uploaded on ${new Date().toLocaleDateString()}`
        });
        processedCount++;

        if (processedCount === files.length) {
          const updatedDepartment = {
            ...department,
            galleryImages: [...department.galleryImages, ...newGalleryImages]
          };
          onUpdateDepartment(updatedDepartment);
          setIsUploading(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
          setCurrentImageIndex(department.galleryImages.length); 
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleEventExpansion = (index: number) => {
    const newSet = new Set(expandedEvents);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedEvents(newSet);
  };

  const handleServiceClick = (serviceName: string, e: React.MouseEvent) => {
    e.preventDefault();
    const isCommon = COMMON_SERVICES.includes(serviceName);
    const targetId = isCommon ? 'services' : 'contact';
    onNavigateToSection(targetId);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleOpenBooking = () => {
    const bookingData = selectedDate && selectedTime ? {
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      department: department.name
    } : null;

    window.dispatchEvent(new CustomEvent('open-booking', { detail: bookingData }));
  };

  const nextImage = () => {
    if (department.galleryImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % department.galleryImages.length);
    }
  };

  const prevImage = () => {
    if (department.galleryImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + department.galleryImages.length) % department.galleryImages.length);
    }
  };

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleDateClick = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (date < today) return;
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const timeSlots = ["09:00 AM", "10:30 AM", "11:45 AM", "02:00 PM", "03:30 PM", "04:45 PM"];

  const shareOptions = [
    { name: 'Email', icon: 'fa-envelope', color: 'bg-slate-100 text-slate-700', href: `mailto:?subject=Check out the ${department.name} at Moi Voi Hospital&body=I thought you might be interested in the services offered by the ${department.name} department at Moi Voi County Referral Hospital: ${window.location.href}` },
    { name: 'WhatsApp', icon: 'fa-whatsapp', color: 'bg-emerald-100 text-emerald-600', href: `https://wa.me/?text=Check out the ${department.name} at Moi Voi Hospital: ${window.location.href}` },
    { name: 'Facebook', icon: 'fa-facebook-f', color: 'bg-blue-100 text-blue-600', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
    { name: 'Twitter', icon: 'fa-x-twitter', color: 'bg-slate-900 text-white', href: `https://twitter.com/intent/tweet?text=Check out the ${department.name} at Moi Voi Hospital&url=${encodeURIComponent(window.location.href)}` }
  ];

  const relatedDepartments = allDepartments.filter(d => d.id !== department.id);

  return (
    <div className="animate-in fade-in duration-500 pb-24">
      <nav aria-label="Breadcrumb" className="bg-slate-100 py-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-medium">
            <button 
              onClick={onBack}
              className="text-teal-700 hover:text-teal-900 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 rounded px-2 py-1 transition-all"
            >
              <i className="fa-solid fa-house" aria-hidden="true"></i> Home
            </button>
            <i className="fa-solid fa-chevron-right text-slate-500 text-[10px]" aria-hidden="true"></i>
            <span className="text-slate-700 uppercase tracking-widest text-[10px] font-bold">Departments</span>
            <i className="fa-solid fa-chevron-right text-slate-500 text-[10px]" aria-hidden="true"></i>
            <span className="text-slate-900 font-semibold" aria-current="page">{department.name}</span>
          </div>

          <div className="relative" ref={shareMenuRef}>
            <button 
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded-lg font-bold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              aria-expanded={showShareMenu}
              aria-haspopup="true"
            >
              <i className="fa-solid fa-share-nodes"></i> Share
            </button>

            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-[70] animate-in fade-in zoom-in duration-150 origin-top-right">
                <div className="px-3 py-2 border-b border-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Share this page</span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-1">
                  {shareOptions.map((option) => (
                    <a
                      key={option.name}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-50 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                      onClick={() => setShowShareMenu(false)}
                    >
                      <div className={`w-10 h-10 ${option.color} rounded-full flex items-center justify-center text-sm shadow-sm group-hover:scale-110 transition-transform`}>
                        <i className={`fa-solid ${option.icon}`}></i>
                      </div>
                      <span className="text-[10px] font-bold text-slate-700">{option.name}</span>
                    </a>
                  ))}
                </div>
                <div className="p-1 mt-1 border-t border-slate-50">
                  <button 
                    onClick={handleCopyLink}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-teal-50 text-teal-700 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {copySuccess ? 'Link Copied!' : 'Copy Page Link'}
                    </span>
                    <i className={`fa-solid ${copySuccess ? 'fa-check' : 'fa-link'} text-xs`}></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <section className="group relative h-[450px] md:h-[550px] overflow-hidden" aria-labelledby="dept-hero-heading">
        <img 
          src={department.image} 
          alt={`Specialized medical equipment and facilities in the ${department.name} department`} 
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out opacity-90 group-hover:opacity-100 group-hover:scale-110 animate-in fade-in duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/95 via-teal-900/40 to-transparent flex flex-col justify-end p-8 md:p-16 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg border border-white/10 transition-transform group-hover:scale-110 pointer-events-auto">
                <i className={`fa-solid ${department.icon}`} aria-hidden="true"></i>
              </div>
              <h1 id="dept-hero-heading" className="text-4xl md:text-6xl font-extrabold text-white">{department.name}</h1>
            </div>
            <p className="text-xl text-slate-100 max-w-3xl font-light leading-relaxed mb-8">
              Providing exceptional {department.name.toLowerCase()} healthcare to the Voi community and beyond.
            </p>
            
            <div className="flex flex-wrap gap-4 pointer-events-auto">
              <a 
                href="tel:+254712345678"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-white hover:text-teal-900 transition-all shadow-xl group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                aria-label="Call Hospital Main Line"
              >
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                  <i className="fa-solid fa-phone-volume"></i>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-80">Call Us Now</span>
                  <span className="text-lg">+254 712 345 678</span>
                </div>
              </a>
              
              <button 
                onClick={handleOpenBooking}
                className="bg-teal-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-teal-400 transition-all shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
              >
                <i className="fa-solid fa-calendar-check text-xl"></i>
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <article>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">About the Department</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                {department.longDescription}
              </p>
              <button 
                onClick={handleOpenBooking}
                className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <i className="fa-solid fa-calendar-check"></i> Book Appointment
              </button>
            </article>

            <section aria-labelledby="gallery-heading" className="overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h3 id="gallery-heading" className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <i className="fa-solid fa-images text-teal-700" aria-hidden="true"></i> Facilities & Excellence
                </h3>
                <div className="flex items-center gap-3">
                  
<div className="flex gap-2">
  <button 
    onClick={prevImage}
    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
    aria-label="Previous image"
  >
    <i className="fa-solid fa-chevron-left"></i>
  </button>
  <button 
    onClick={nextImage}
    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
    aria-label="Next image"
  >
    <i className="fa-solid fa-chevron-right"></i>
  </button>
</div>

                </div>
              </div>

              {department.galleryImages.length > 0 ? (
                <div className="relative group/gallery aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
                  {department.galleryImages.map((image, idx) => (
                    <div 
                      key={idx} 
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                      <img 
                        src={image.url} 
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-8">
                        <p className="text-white text-sm font-bold uppercase tracking-[0.2em] animate-in slide-in-from-bottom-2 duration-700">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {department.galleryImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${idx === currentImageIndex ? 'w-8 bg-teal-500' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl aspect-[16/9] md:aspect-[21/9] flex flex-col items-center justify-center text-slate-400 gap-4">
                  <i className="fa-solid fa-image text-5xl opacity-20"></i>
                  <p className="font-medium">No gallery images available.</p>
                </div>
              )}
            </section>

            <section aria-labelledby="sub-services-heading">
              <h3 id="sub-services-heading" className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <i className="fa-solid fa-list-check text-teal-700" aria-hidden="true"></i> Specialized Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {department.subServices.map((service, idx) => (
                  <a 
                    key={idx} 
                    href={COMMON_SERVICES.includes(service) ? "#services" : "#contact"}
                    onClick={(e) => handleServiceClick(service, e)}
                    className="group bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4 hover:border-teal-400 hover:bg-white transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                    aria-label={`View more details about ${service}`}
                  >
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <i className="fa-solid fa-check text-xs" aria-hidden="true"></i>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">{service}</span>
                      <span className="text-[10px] text-teal-600 font-bold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <i className="fa-solid fa-arrow-right ml-1"></i>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {department.serviceCharter && department.serviceCharter.length > 0 && (
              <section aria-labelledby="dept-service-charter-heading" className="mt-12">
                <h3 id="dept-service-charter-heading" className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <i className="fa-solid fa-clipboard-list text-teal-700" aria-hidden="true"></i> Service Charter
                </h3>
                <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 uppercase tracking-wider text-xs font-bold border-b border-slate-200">
                        <th className="p-4 px-6">Service</th>
                        <th className="p-4 px-6">Requirements</th>
                        <th className="p-4 px-6">Charges</th>
                        <th className="p-4 px-6">Waiting Time</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                      {department.serviceCharter.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 px-6 font-semibold">{item.service}</td>
                          <td className="p-4 px-6 whitespace-pre-wrap">{item.requirements || '-'}</td>
                          <td className="p-4 px-6 font-medium text-teal-700">{item.charges || '-'}</td>
                          <td className="p-4 px-6 text-slate-500">{item.time || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section aria-labelledby="dept-events-heading">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h3 id="dept-events-heading" className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <i className="fa-solid fa-calendar-day text-teal-700" aria-hidden="true"></i> Upcoming Events & Specialized Clinics
                </h3>
              </div>

              {localEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {localEvents.map((event, idx) => {
                    const isExpanded = expandedEvents.has(idx);
                    return (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-teal-600 px-6 py-4 text-white">
                          <h4 className="font-bold text-lg leading-tight group-hover:translate-x-1 transition-transform">{event.title}</h4>
                        </div>
                        <div className="p-6 space-y-4 flex-grow">
                          <div className="flex items-center gap-3 text-slate-700">
                            <i className="fa-solid fa-calendar text-teal-600 w-5"></i>
                            <span className="text-sm font-semibold">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-700">
                            <i className="fa-solid fa-clock text-teal-600 w-5"></i>
                            <span className="text-sm font-semibold">{event.time}</span>
                          </div>
                          
                          <div 
                            className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                          >
                            <div className="overflow-hidden">
                              <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 mt-4">
                                {event.description}
                              </p>
                            </div>
                          </div>

                          <button 
                            onClick={() => toggleEventExpansion(idx)}
                            className="text-teal-600 font-bold text-xs flex items-center gap-1 hover:text-teal-800 transition-colors focus:outline-none"
                          >
                            {isExpanded ? (
                              <>Read Less <i className="fa-solid fa-chevron-up text-[10px]"></i></>
                            ) : (
                              <>Read More <i className="fa-solid fa-chevron-down text-[10px]"></i></>
                            )}
                          </button>
                        </div>
                        <div className="px-6 pb-6 mt-auto">
                          <button 
                            onClick={handleOpenBooking}
                            className="w-full text-center py-2 text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-600 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                          >
                            Inquire for this Event
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                  <i className="fa-solid fa-calendar-xmark text-slate-300 text-4xl mb-4"></i>
                  <p className="text-slate-500 font-medium">No events currently scheduled for this department.</p>
                  
                </div>
              )}
            </section>

            <section aria-labelledby="dept-slots-heading">
              <h3 id="dept-slots-heading" className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <i className="fa-solid fa-calendar-check text-teal-700" aria-hidden="true"></i> Available Appointment Slots
              </h3>
              
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[450px]">
                <div className="w-full md:w-2/3 p-6 border-r border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <i className="fa-solid fa-calendar-days text-teal-600"></i>
                      {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h4>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                      >
                        <i className="fa-solid fa-chevron-left text-xs"></i>
                      </button>
                      <button 
                        onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                      >
                        <i className="fa-solid fa-chevron-right text-xs"></i>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDayOfMonth(viewDate) }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square"></div>
                    ))}
                    {Array.from({ length: daysInMonth(viewDate) }).map((_, i) => {
                      const day = i + 1;
                      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                      const today = new Date();
                      today.setHours(0,0,0,0);
                      const isPast = date < today;
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                      return (
                        <button
                          key={day}
                          disabled={isPast}
                          onClick={() => handleDateClick(day)}
                          className={`
                            aspect-square rounded-xl flex flex-col items-center justify-center transition-all relative group
                            ${isSelected ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' : 'hover:bg-teal-50'}
                            ${isPast ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}
                            ${isWeekend ? 'text-slate-400' : 'text-slate-700'}
                          `}
                        >
                          <span className={`text-sm font-bold ${isSelected ? 'text-white' : ''}`}>
                            {day}
                          </span>
                          {!isPast && !isSelected && (
                            <div className="w-1 h-1 rounded-full bg-teal-400 mt-1 opacity-40 group-hover:opacity-100"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full md:w-1/3 bg-slate-50 p-6 flex flex-col">
                  <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-clock text-teal-600"></i>
                    Available Times
                  </h4>

                  {selectedDate ? (
                    <div className="flex flex-col gap-3 flex-grow overflow-y-auto pr-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                        Slots for {selectedDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                      </p>
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex justify-between items-center
                            ${selectedTime === time 
                              ? 'bg-teal-600 text-white shadow-md' 
                              : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-400 hover:text-teal-600'}
                          `}
                        >
                          {time}
                          {selectedTime === time && <i className="fa-solid fa-check"></i>}
                        </button>
                      ))}
                      
                      {selectedTime && (
                        <div className="mt-auto pt-6 animate-in slide-in-from-bottom-2">
                          <button
                            onClick={handleOpenBooking}
                            className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-teal-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                            <i className="fa-solid fa-calendar-check"></i>
                            Confirm and Book
                          </button>
                          <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
                            Click to finalize your {selectedTime} appointment.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-300 mb-4 shadow-sm">
                        <i className="fa-solid fa-calendar-day"></i>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Please select a date from the calendar to view available time slots.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {department.faqs && department.faqs.length > 0 && (
              <section aria-labelledby="dept-faqs-heading">
                <h3 id="dept-faqs-heading" className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <i className="fa-solid fa-circle-question text-teal-700" aria-hidden="true"></i> Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {department.faqs.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
                        openFaq === idx 
                        ? 'border-teal-200 bg-white shadow-lg' 
                        : 'border-slate-200 bg-white shadow-sm'
                      }`}
                    >
                      <button 
                        id={`faq-button-${idx}`}
                        onClick={() => toggleFaq(idx)}
                        className={`w-full text-left p-6 flex justify-between items-center transition-all focus:outline-none focus-visible:bg-teal-50 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-teal-600 ${
                          openFaq === idx ? 'bg-teal-50/30' : 'hover:bg-slate-50'
                        }`}
                        aria-expanded={openFaq === idx}
                        aria-controls={`faq-content-${idx}`}
                      >
                        <span className={`font-bold transition-colors ${openFaq === idx ? 'text-teal-900' : 'text-slate-800'} pr-8`}>
                          {faq.question}
                        </span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                          openFaq === idx ? 'bg-teal-600 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                        }`}>
                          <i className="fa-solid fa-chevron-down text-xs" aria-hidden="true"></i>
                        </div>
                      </button>
                      <div 
                        id={`faq-content-${idx}`}
                        role="region"
                        aria-labelledby={`faq-button-${idx}`}
                        className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                          openFaq === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                        aria-hidden={openFaq !== idx}
                      >
                        <div className="overflow-hidden">
                          <div className={`p-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/30 transition-all duration-700 delay-100 ${
                            openFaq === idx ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                          }`}>
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="bg-teal-50 p-8 rounded-3xl border border-teal-200 flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center text-white text-4xl shadow-md flex-shrink-0">
                <i className="fa-solid fa-calendar-check" aria-hidden="true"></i>
              </div>
              <div>
                <h4 className="text-xl font-bold text-teal-900 mb-2">Schedule an Appointment</h4>
                <p className="text-teal-800 mb-4 leading-relaxed">Our specialists in the {department.name} department are ready to assist you. Book a consultation today for a thorough evaluation.</p>
                <button 
                  onClick={handleOpenBooking}
                  className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                >
                  <i className="fa-solid fa-calendar-check"></i> Book Appointment
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <section className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm" aria-labelledby="dept-leadership-heading">
              <h4 id="dept-leadership-heading" className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100 uppercase tracking-wide text-sm">Department Leadership</h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-2xl overflow-hidden border-2 border-white shadow-sm">
                  <i className="fa-solid fa-user-doctor" aria-hidden="true"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{department.headOfDepartment || 'Consultant Physician'}</p>
                  <p className="text-xs text-teal-800 font-bold uppercase tracking-wider mt-1">Head of Department</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative" aria-labelledby="help-sidebar-heading">
              <i className="fa-solid fa-house-medical absolute -bottom-4 -right-4 text-8xl text-white/5 rotate-12" aria-hidden="true"></i>
              <h4 id="help-sidebar-heading" className="text-lg font-bold mb-4">Need Help?</h4>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                If you have specific questions about our services or need to speak with the {department.name} reception, contact us directly.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-phone text-xs" aria-hidden="true"></i>
                  </div>
                  <span className="text-sm font-semibold tracking-wide">+254 712 345 678</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-clock text-xs" aria-hidden="true"></i>
                  </div>
                  <span className="text-sm font-semibold tracking-wide">24/7 Emergency Desk</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <i className="fa-solid fa-hospital-user text-teal-600" aria-hidden="true"></i> Explore Other Departments
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedDepartments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => onNavigate(dept)}
                className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left hover:border-teal-400 hover:bg-white transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <i className={`fa-solid ${dept.icon} text-xl`} aria-hidden="true"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">{dept.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>
                <div className="mt-4 flex items-center text-[10px] font-bold text-teal-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View Department <i className="fa-solid fa-chevron-right ml-2"></i>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onNavigateToSection('departments')}
              className="bg-white text-teal-700 border border-teal-200 px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-50 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              <i className="fa-solid fa-hospital mr-2"></i> Explore Departments
            </button>
            <button 
              onClick={() => onNavigateToSection('services')}
              className="bg-white text-teal-700 border border-teal-200 px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-50 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              <i className="fa-solid fa-hand-holding-medical mr-2"></i> View all Services
            </button>
          </div>
          
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-slate-700 hover:text-teal-700 font-bold transition-all px-10 py-4 rounded-full hover:bg-white shadow-sm border border-transparent hover:border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            aria-label="Return to main hospital website"
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to Main Website
          </button>
        </div>
      </section>
    </div>
  );
};

export default DepartmentDetail;
