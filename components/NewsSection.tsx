import React from 'react';

const newsItems = [
  {
    id: 1,
    title: "New Digital X-Ray Machine Installed",
    date: "October 10, 2024",
    category: "Facility Upgrade",
    description: "The Radiology department has received a state-of-the-art digital X-ray machine, reducing wait times and providing clearer imaging for better diagnosis.",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Free Breast Cancer Screening",
    date: "October 14-20, 2024",
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
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Stay Informed</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Hospital News & Announcements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map(news => (
            <div key={news.id} className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-teal-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    {news.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-xs font-bold text-slate-400 mb-2"><i className="fa-regular fa-calendar mr-2"></i>{news.date}</p>
                <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">{news.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {news.description}
                </p>
                <button className="text-teal-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all self-start">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
