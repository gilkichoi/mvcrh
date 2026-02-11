
import React, { useState } from 'react';
import BookingModal from './BookingModal';
import { DetailedDepartment, SocialLinks } from '../types';

declare global {
  interface Window {
    wpData: {
      template_url: string;
      site_url: string;
    };
  }
}

interface NavbarProps {
  onNavigate?: (id: string) => void;
  isLoggedIn?: boolean;
  onAdminClick?: () => void;
  departments: DetailedDepartment[];
  socialLinks: SocialLinks;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, isLoggedIn, onAdminClick, departments, socialLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Safely get theme URL
  const themeUrl = window.wpData?.template_url || '';

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Departments', id: 'departments' },
    { name: 'Services', id: 'services' },
    { name: 'SHA Info', id: 'sha' },
    { name: 'Resources', id: 'resources' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-white py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><i className="fa-solid fa-phone text-teal-400"></i> Emergency: +254 722 000 000</span>
            <span className="flex items-center gap-2"><i className="fa-solid fa-envelope text-teal-400"></i> info@mvcrh.or.ke</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 mr-2">Connect:</span>
            <div className="flex gap-3">
              {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors"><i className="fa-brands fa-facebook-f"></i></a>}
              {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors"><i className="fa-brands fa-x-twitter"></i></a>}
              {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors"><i className="fa-brands fa-instagram"></i></a>}
              {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors"><i className="fa-brands fa-linkedin-in"></i></a>}
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div 
                className="flex-shrink-0 flex items-center gap-4 cursor-pointer"
                onClick={() => handleLinkClick('home')}
              >
                <div className="h-16 w-16 flex items-center justify-center p-1">
                  <img 
                    src={`${themeUrl}/logo.png`} 
                    alt="Taita Taveta County Logo" 
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                    onError={(e) => {
                       // Fallback icon if image doesn't exist yet in the directory
                       e.currentTarget.style.display = 'none';
                       e.currentTarget.parentElement!.innerHTML = '<i class="fa-solid fa-house-medical text-teal-600 text-3xl"></i>';
                    }}
                  />
                </div>
                <div className="hidden xs:block">
                  <span className="text-teal-900 font-extrabold text-xl block leading-tight tracking-tight">Moi Voi</span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] block">County Referral Hospital</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-slate-600 hover:text-teal-600 font-semibold transition-colors border-none bg-transparent cursor-pointer text-sm"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                {isLoggedIn ? (
                  <button 
                    onClick={onAdminClick}
                    className="flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-teal-100 transition-all"
                  >
                    <i className="fa-solid fa-user-shield"></i> Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="bg-teal-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-teal-700 transition-all shadow-md active:scale-95"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-teal-600 focus:outline-none p-2"
              >
                <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-2 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <button
                key={link.name}
                className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50 border-none bg-transparent transition-all"
                onClick={() => handleLinkClick(link.id)}
              >
                {link.name}
              </button>
            ))}
            <div className="px-2 pt-4">
              <button
                className="block w-full text-center bg-teal-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg"
                onClick={() => {
                  setIsOpen(false);
                  setIsBookingOpen(true);
                }}
              >
                Book Consultation
              </button>
            </div>
            <div className="flex justify-center gap-8 py-6 border-t border-slate-50 mt-4">
              {socialLinks.facebook && <a href={socialLinks.facebook} className="text-slate-400 hover:text-teal-600 text-xl"><i className="fa-brands fa-facebook-f"></i></a>}
              {socialLinks.twitter && <a href={socialLinks.twitter} className="text-slate-400 hover:text-teal-600 text-xl"><i className="fa-brands fa-x-twitter"></i></a>}
              {socialLinks.instagram && <a href={socialLinks.instagram} className="text-slate-400 hover:text-teal-600 text-xl"><i className="fa-brands fa-instagram"></i></a>}
            </div>
            <button
              className="block w-full text-center text-slate-400 font-bold py-4 text-[10px] uppercase tracking-widest border-t border-slate-50"
              onClick={onAdminClick}
            >
              Secure Staff Portal
            </button>
          </div>
        )}
      </nav>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        departments={departments}
      />
    </>
  );
};

export default Navbar;