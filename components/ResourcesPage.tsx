import React, { useState, useMemo } from 'react';
import { Resource } from '../types';

interface ResourcesPageProps {
  resources: Resource[];
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({ resources }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Legislative Acts', 'Hospital Forms', 'Finance & Tenders', 'Patient Guides'];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, resources]);

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF': return 'fa-file-pdf text-red-500';
      case 'DOCX': return 'fa-file-word text-blue-500';
      case 'XLSX': return 'fa-file-excel text-emerald-500';
      default: return 'fa-file-lines text-slate-400';
    }
  };

  const handleDownload = (e: React.MouseEvent, resource: Resource) => {
    if (resource.downloadUrl === 'javascript:void(0)') {
      e.preventDefault();
      alert(`The document "${resource.title}" is currently being processed for online access. Please visit our Records Office for a physical copy.`);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-24">
      {/* Header Section */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <i className="fa-solid fa-file-invoice absolute top-10 right-10 text-[200px] text-white rotate-12"></i>
          <i className="fa-solid fa-book-medical absolute -bottom-10 left-10 text-[150px] text-white -rotate-12"></i>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Public Resources & Documents</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Access and download important hospital forms, legislative acts, and county healthcare guidelines.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="flex-1 relative">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text"
                placeholder="Search documents by title or keyword..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === category 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <div 
                  key={resource.id} 
                  className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-teal-400 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                      <i className={`fa-solid ${getFileIcon(resource.fileType)}`}></i>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 text-slate-500 rounded">
                      {resource.fileType} • {resource.fileSize}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 flex-grow leading-relaxed">
                    {resource.description}
                  </p>
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {resource.category}
                    </span>
                    <a 
                      href={resource.downloadUrl}
                      className="inline-flex items-center gap-2 text-teal-600 font-bold text-sm hover:text-teal-800 transition-colors"
                      onClick={(e) => handleDownload(e, resource)}
                      download={resource.downloadUrl !== 'javascript:void(0)'}
                    >
                      Download <i className="fa-solid fa-download"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <i className="fa-solid fa-file-circle-xmark text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No documents found</h3>
              <p className="text-slate-500">We couldn't find any resources matching your search criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                className="mt-6 text-teal-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      
      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 mt-16">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "What are the general visitation hours?",
              a: "General visitation hours are from 12:30 PM to 2:00 PM and from 4:30 PM to 5:30 PM daily. Please note that special units like the Newborn Unit have restricted visiting hours."
            },
            {
              q: "Does the hospital accept SHA (Social Health Authority) insurance?",
              a: "Yes, we accept SHA insurance for a wide range of inpatient and outpatient services. Please present a valid SHA card at the revenue or admission office to facilitate pre-authorization and claims processing."
            },
            {
              q: "What documents do I need to bring for admission?",
              a: "You should bring your national ID or passport, your hospital file (if you have one), a valid SHA cover or other insurance cards, and any referral letters or doctor's requests you were given."
            },
            {
              q: "How do I clear my hospital bill?",
              a: "Hospital bills and mortuary fees can be cleared at the Cash Office. Please ensure you present the necessary documents, such as discharge summaries or burial permits, to complete the process."
            },
            {
              q: "Are emergency services available 24/7?",
              a: "Yes, our Emergency Unit and Theatre handle life-threatening conditions and emergency surgeries 24 hours a day, 7 days a week."
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-3">
                <i className="fa-solid fa-circle-question text-teal-600 mt-1"></i> {faq.q}
              </h3>
              <p className="text-slate-600 pl-8 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="max-w-4xl mx-auto px-4 mt-16">
        <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
            <i className="fa-solid fa-circle-info"></i>
          </div>
          <div>
            <h4 className="text-lg font-bold text-teal-900 mb-2">Can't find a specific document?</h4>
            <p className="text-teal-700 text-sm leading-relaxed">
              If you require a specific medical form or legislative act not listed here, please visit our Records Office at the hospital or send an email to <span className="font-bold">records@taitataveta.go.ke</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;