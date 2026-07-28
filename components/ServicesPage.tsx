import React from 'react';
import { useLanguage } from '../LanguageContext';

interface ServicesPageProps {
  services: any[];
}

const ServicesPage: React.FC<ServicesPageProps> = ({ services }) => {
  const { tText } = useLanguage();

  return (
    <section className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">{tText('What We Offer')}</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">{tText('Our Services')}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex gap-6 hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                <i className="fa-solid fa-check-circle text-xl"></i>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{tText(service.title)}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{tText(service.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
