
import React from 'react';

const SHAPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-700 to-teal-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <i className="fa-solid fa-shield-heart absolute top-10 right-10 text-[200px] text-white rotate-12"></i>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 mb-6">
                <span className="text-xs font-bold text-white uppercase tracking-widest">National Health Transition</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                Social Health <span className="text-teal-300">Authority (SHA)</span>
              </h1>
              <p className="text-teal-50 text-lg max-w-2xl leading-relaxed mb-8">
                The Social Health Authority (SHA) replaces NHIF to provide more inclusive healthcare for all Kenyans. Register today to ensure continued access to services at Moi Voi County Referral Hospital.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a 
                  href="https://sha.go.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-teal-900 px-8 py-4 rounded-2xl font-bold hover:bg-teal-50 transition-all flex items-center gap-2 shadow-xl"
                >
                  Visit SHA Portal <i className="fa-solid fa-external-link text-xs"></i>
                </a>
                <button 
                  onClick={() => document.getElementById('register-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-teal-600/40 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all"
                >
                  How to Register
                </button>
              </div>
            </div>
            <div className="hidden lg:block flex-shrink-0 w-80">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[40px] shadow-2xl">
                <div className="text-center mb-6">
                  <i className="fa-solid fa-mobile-screen-button text-4xl text-teal-300 mb-4"></i>
                  <h4 className="text-white font-bold">Quick USSD</h4>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/10">
                    <p className="text-teal-200 text-xs font-bold uppercase tracking-widest mb-1">Registration</p>
                    <p className="text-2xl font-black text-white">*147#</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/10">
                    <p className="text-teal-200 text-xs font-bold uppercase tracking-widest mb-1">Support Desk</p>
                    <p className="text-white font-bold text-sm">0800 720 601</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Info Sections */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Registration Card */}
          <div id="register-section" className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col">
            <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 text-2xl mb-6">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">How to Register</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Every Kenyan citizen is required to register under the Social Health Insurance Fund (SHIF) managed by SHA.
            </p>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                <p><span className="font-bold">Dial USSD Code:</span> Simply dial <span className="text-teal-600 font-bold">*147#</span> on any mobile network.</p>
              </li>
              <li className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                <p><span className="font-bold">Online Portal:</span> Visit <a href="https://sha.go.ke/" className="text-teal-600 underline">sha.go.ke</a> and click on 'Register'.</p>
              </li>
              <li className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
                <p><span className="font-bold">CHPs Assistance:</span> Community Health Promoters are available at Moi Voi Hospital to assist you.</p>
              </li>
            </ul>
            <a 
              href="https://sha.go.ke/registration" 
              className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold text-center hover:bg-teal-700 transition-all shadow-lg"
            >
              Start Registration Online
            </a>
          </div>

          {/* Eligibility Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-2xl mb-6">
              <i className="fa-solid fa-user-check"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Check Eligibility</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Verify your status to ensure you can receive maternity, surgical, and outpatient services.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
              <h4 className="font-bold text-sm text-slate-800 mb-3">Verification Methods:</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fa-solid fa-check text-teal-600"></i>
                  <span>Dial *147# and select status check</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fa-solid fa-check text-teal-600"></i>
                  <span>Log in to your SHA portal account</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fa-solid fa-check text-teal-600"></i>
                  <span>Visit any SHA service point in the hospital</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
              <p className="text-xs text-blue-800 leading-relaxed">
                <i className="fa-solid fa-circle-info mr-1"></i>
                <span className="font-bold">Important:</span> Transition from NHIF is NOT automatic. You must register afresh on the new SHA platform to remain eligible.
              </p>
            </div>
            <button className="mt-auto w-full py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
              Verify My Status
            </button>
          </div>

          {/* Payment Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl mb-6">
              <i className="fa-solid fa-money-bill-wave"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">How to Pay</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Payments are calculated as 2.75% of household income or a minimum set for the informal sector.
            </p>
            <div className="space-y-4 mb-8">
              <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50">
                <h4 className="font-bold text-sm mb-1">M-Pesa / e-Citizen</h4>
                <p className="text-xs text-slate-500">Payments are made through the Government Paybill <span className="font-bold text-slate-900">222222</span>.</p>
              </div>
              <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50">
                <h4 className="font-bold text-sm mb-1">Self-Employed</h4>
                <p className="text-xs text-slate-500">Pay directly via the portal or app after generating an invoice.</p>
              </div>
              <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50">
                <h4 className="font-bold text-sm mb-1">Employer Deductions</h4>
                <p className="text-xs text-slate-500">Standard deductions are handled by your employer via iTax/SHA portal.</p>
              </div>
            </div>
            <a 
              href="https://sha.go.ke/contributions" 
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-center hover:bg-emerald-700 transition-all shadow-lg"
            >
              Make Contribution
            </a>
          </div>
        </div>
      </section>

      {/* Transition FAQ */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Transition FAQ</h2>
          <p className="text-slate-600">Quick answers to the most common questions about the move from NHIF to SHA.</p>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2">What happens to my NHIF contributions?</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Your contribution history will be migrated to the new SHA system. However, you must still register afresh to activate your account on the new platform.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2">Can I still use NHIF cards?</h4>
            <p className="text-sm text-slate-600 leading-relaxed">NHIF cards are being phased out. At Moi Voi Hospital, we recommend using your National ID and ensuring your SHA registration is complete.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2">Is the Linda Mama program still active?</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Yes, the benefits previously under Linda Mama have been integrated into the SHA framework to ensure continued free maternity services.</p>
          </div>
        </div>
      </section>

      {/* Hospital Support Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="bg-slate-900 text-white rounded-[40px] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <i className="fa-solid fa-hospital text-9xl"></i>
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Need Assistance with SHA?</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                We have a dedicated SHA Support Desk located at the main reception. Our staff are trained to help you with registration, status verification, and dependents management.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-sm">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal-400 uppercase tracking-widest">Desk Location</p>
                    <p className="text-sm">Main Reception, Ground Floor</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-sm">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal-400 uppercase tracking-widest">Available Hours</p>
                    <p className="text-sm">Mon - Fri: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-4">Official Resources</h4>
              <div className="grid grid-cols-1 gap-4">
                <a href="https://sha.go.ke/" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group">
                  <span className="font-bold text-sm">Official SHA Portal</span>
                  <i className="fa-solid fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                </a>
                <a href="https://sha.go.ke/downloads" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group">
                  <span className="font-bold text-sm">Download SHA Guides</span>
                  <i className="fa-solid fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                </a>
                <a href="tel:0800720601" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group">
                  <span className="font-bold text-sm">Call SHA Toll-Free</span>
                  <i className="fa-solid fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SHAPage;
