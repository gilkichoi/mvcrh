import React from 'react';
import { useLanguage } from '../LanguageContext';
import FacebookFeed from './FacebookFeed';

const newsItems = [
  {
    id: 1,
    title: "New Digital X-Ray Machine Installed",
    date: "October 10, 2026",
    category: "Facility Upgrade",
    description: "The Radiology department has received a state-of-the-art digital X-ray machine, reducing wait times and providing clearer imaging for better diagnosis.",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Free Breast Cancer Screening",
    date: "October 14-20, 2026",
    category: "Health Campaign",
    description: "In observation of Breast Cancer Awareness Month, we are offering free screening and subsidized mammography services for all women above 40.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "SHA Registration Drive",
    date: "Ongoing",
    category: "Important Update",
    description: "Our staff will be assisting patients to register for the new Social Health Authority (SHA) health cover at the main reception. Dial *147# to get started.",
    image: "https://images.unsplash.com/photo-1505751172107-573225a92701?auto=format&fit=crop&q=80&w=600"
  }
];

const NewsSection: React.FC = () => {
  const { tText } = useLanguage();

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">{tText('Stay Informed')}</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">{tText('Hospital News & Facebook Updates')}</h3>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto mt-2">
            {tText('Follow official press releases and live Facebook announcements directly from Moi County Referral Hospital Voi.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {newsItems.map(news => (
            <div key={news.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-teal-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    {tText(news.category)}
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-xs font-bold text-slate-400 mb-2"><i className="fa-regular fa-calendar mr-2"></i>{tText(news.date)}</p>
                <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">{tText(news.title)}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {tText(news.description)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Facebook Page Feed Section */}
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <i className="fa-brands fa-facebook text-blue-600"></i>
                {tText('Live Facebook Social Feed')}
              </h3>
              <p className="text-slate-500 text-xs">
                {tText('Synced live with https://www.facebook.com/people/Moi-County-Referral-Hospital-Voi/100089810477442/')}
              </p>
            </div>
          </div>
          <FacebookFeed />
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
