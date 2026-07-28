import React from 'react';
import { useLanguage } from '../LanguageContext';

const ContactPage: React.FC = () => {
  const { tText } = useLanguage();

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">{tText('Get In Touch')}</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">{tText('Contact Us')}</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {tText('We are here to help. Reach out to us for any inquiries, appointments, or emergency assistance.')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
              <i className="fa-solid fa-phone"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-2">{tText('Emergency Line')}</h4>
            <p className="text-slate-500 text-sm mb-4">{tText('Available 24/7')}</p>
            <a href="tel:+254432030746" className="text-xl font-bold text-teal-600 hover:underline">+254 43 203 0746</a>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-2">{tText('Email Address')}</h4>
            <p className="text-slate-500 text-sm mb-4">{tText('For general inquiries')}</p>
            <a href="mailto:info@mvcrh.or.ke" className="text-lg font-bold text-teal-600 hover:underline">info@mvcrh.or.ke</a>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-2">{tText('Location')}</h4>
            <p className="text-slate-500 text-sm mb-4">{tText('Visit our facility')}</p>
            <p className="text-md font-bold text-slate-700">{tText('Voi Town, Off Nairobi-Mombasa Highway, Kenya')}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-md">
              <i className="fa-brands fa-facebook-f"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-2">{tText('Official Facebook Page')}</h4>
            <p className="text-slate-500 text-sm mb-4">{tText('Follow for live announcements')}</p>
            <a 
              href="https://www.facebook.com/people/Moi-County-Referral-Hospital-Voi/100089810477442/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-bold text-blue-700 hover:underline flex items-center justify-center gap-1"
            >
              <span>Moi County Referral Hospital - Voi</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{tText('Send us a Message')}</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{tText('First Name')}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{tText('Last Name')}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{tText('Your Email')}</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{tText('Message')}</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none" placeholder={tText('How can we help you?')}></textarea>
                </div>
                <button type="button" className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-colors">
                  {tText('Send Message')}
                </button>
              </form>
            </div>
            <div className="bg-slate-200 h-full min-h-[400px]">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15918.572459737198!2d38.54924731388856!3d-3.393450917260589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183e2da0c72e2d93%3A0x6d117a3f3a8b417e!2sMoi%20County%20Referral%20Hospital%2C%20Voi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Hospital Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
