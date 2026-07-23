import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Our Story</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">About Moi Voi County Referral Hospital</h3>
          <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              Moi Voi County Referral Hospital is the premier healthcare provider in Taita Taveta County, committed to delivering exceptional medical services to our community and beyond.
            </p>
            <p>
              Founded with a vision to offer state-of-the-art medical care accessible to all, our facility is equipped with modern technology and staffed by dedicated healthcare professionals who put patient well-being first.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                <i className="fa-solid fa-bullseye text-3xl text-teal-600 mb-4"></i>
                <h4 className="font-bold text-slate-900 mb-2">Our Mission</h4>
                <p className="text-sm">To provide quality, affordable, and accessible healthcare to all.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <i className="fa-solid fa-eye text-3xl text-blue-600 mb-4"></i>
                <h4 className="font-bold text-slate-900 mb-2">Our Vision</h4>
                <p className="text-sm">To be a center of excellence in healthcare delivery in the region.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-teal-600 rounded-3xl transform translate-x-4 translate-y-4 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1538108149393-cebb47ac113a?auto=format&fit=crop&q=80&w=800" 
              alt="Hospital Team" 
              className="rounded-3xl shadow-xl relative z-10 w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
