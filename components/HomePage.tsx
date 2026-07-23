import React from 'react';
import TestimonialCarousel from './TestimonialCarousel';
import FeedbackForm from './FeedbackForm';
import { DetailedDepartment, NewsItem, EventItem } from '../types';

interface HomePageProps {
  onNavigate: (view: string) => void;
  departments: DetailedDepartment[];
  onAddFeedback: (feedback: any) => Promise<void>;
  newsItems: NewsItem[];
  eventItems: EventItem[];
}





const HomePage: React.FC<HomePageProps> = ({ onNavigate, departments, onAddFeedback, newsItems, eventItems }) => {
  return (
    <>
      <section id="home" className="relative bg-slate-900 text-white overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920" 
            alt="Hospital Exterior" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-transparent z-10"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-start w-full">
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
              onClick={() => onNavigate('departments')}
              className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all text-center shadow-lg"
            >
              Explore Departments
            </button>
            <button 
              onClick={() => onNavigate('sha')}
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
          <span className="flex items-center gap-2 cursor-pointer hover:text-teal-600" onClick={() => onNavigate('sha')}>
            <i className="fa-solid fa-shield-heart"></i> Register for SHA: Dial *147#
          </span>
          <a href="tel:+254432030746" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
            <i className="fa-solid fa-phone"></i> Emergency: +254 43 203 0746
          </a>
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot"></i> Voi Town, Off Nairobi-Mombasa Highway
          </span>
        </div>
      </div>

      {/* Compact Departments, News & Events Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Top Departments */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-1">Our Center of Excellence</h2>
                <h3 className="text-2xl font-black text-slate-900">Featured Departments</h3>
              </div>
              <button onClick={() => onNavigate('departments')} className="text-teal-600 text-sm font-bold hover:underline mb-1">
                View All <i className="fa-solid fa-arrow-right ml-1"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {departments.slice(0, 4).map(dept => (
                <div key={dept.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-all group">
                  <div className="flex gap-4 items-center mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={dept.image} alt={dept.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{dept.name}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2">{dept.description}</p>
                </div>
              ))}
            </div>

            {/* News Section */}
            <div className="mt-16 flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-1">Hospital News</h2>
                <h3 className="text-2xl font-black text-slate-900">Latest Updates</h3>
              </div>
              <button onClick={() => onNavigate('news')} className="text-teal-600 text-sm font-bold hover:underline mb-1">
                More News <i className="fa-solid fa-arrow-right ml-1"></i>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {newsItems.map(news => (
                  <div key={news.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate('news')}>
                    <div className="h-40 overflow-hidden relative">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-teal-700 shadow-sm">
                        {news.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-slate-500 font-semibold mb-2 flex items-center gap-2">
                        <i className="fa-regular fa-calendar text-teal-500"></i> {news.date}
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">{news.title}</h4>
                      <p className="text-sm text-slate-600 line-clamp-2">{news.description}</p>
                    </div>
                  </div>
               ))}
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24">
              <div className="mb-6">
                <h2 className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-1">Join Us</h2>
                <h3 className="text-2xl font-black text-slate-900">Upcoming Events</h3>
              </div>
              
              <div className="space-y-6">
                {eventItems.map(event => (
                  <div key={event.id} className="flex gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <i className={`fa-solid ${event.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{event.title}</h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-slate-600 font-medium flex items-center gap-2">
                          <i className="fa-regular fa-calendar w-3 text-slate-400"></i> {event.date}
                        </p>
                        <p className="text-xs text-slate-600 font-medium flex items-center gap-2">
                          <i className="fa-regular fa-clock w-3 text-slate-400"></i> {event.time}
                        </p>
                        <p className="text-xs text-slate-600 font-medium flex items-center gap-2">
                          <i className="fa-solid fa-location-dot w-3 text-slate-400"></i> {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 py-3 border border-teal-200 text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-colors">
                View All Events
              </button>
            </div>
          </div>
          
        </div>
      </section>

      {/* Testimonials & Feedback */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="mb-10">
                <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Patient Voices</h2>
                <h3 className="text-3xl font-black text-slate-900">What the Community Says</h3>
              </div>
              <TestimonialCarousel />
            </div>
            
            <div>
              <div className="mb-10">
                <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Share With Us</h2>
                <h3 className="text-3xl font-black text-slate-900">Share Your Experience</h3>
              </div>
              <FeedbackForm onSubmit={onAddFeedback} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
