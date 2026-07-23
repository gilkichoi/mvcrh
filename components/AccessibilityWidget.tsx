import React, { useState, useEffect } from 'react';

const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    largeText: false,
    highContrast: false,
    grayscale: false,
    highlightLinks: false,
    dyslexiaFont: false,
  });

  useEffect(() => {
    const html = document.documentElement;
    
    // Toggle classes on html/body based on settings
    if (settings.largeText) html.classList.add('text-lg', 'md:text-xl');
    else html.classList.remove('text-lg', 'md:text-xl');

    if (settings.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    if (settings.grayscale) html.style.filter = 'grayscale(100%)';
    else html.style.filter = '';

    if (settings.highlightLinks) html.classList.add('highlight-links');
    else html.classList.remove('highlight-links');

    if (settings.dyslexiaFont) html.style.fontFamily = 'OpenDyslexic, sans-serif';
    else html.style.fontFamily = '';

  }, [settings]);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <style>{`
        .high-contrast {
          background-color: #000 !important;
          color: #fff !important;
        }
        .high-contrast * {
          background-color: #000 !important;
          color: #fff !important;
          border-color: #fff !important;
        }
        .highlight-links a, .highlight-links button {
          outline: 3px solid #ffeb3b !important;
          outline-offset: 2px !important;
          background-color: #000 !important;
          color: #ffeb3b !important;
        }
      `}</style>
      <div className="fixed bottom-24 right-6 z-50">
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-72 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-teal-600 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <i className="fa-solid fa-universal-access"></i> Accessibility
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-4 space-y-3">
              <button 
                onClick={() => toggleSetting('largeText')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${settings.largeText ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-text-height text-slate-500"></i>
                  <span className="font-bold text-sm text-slate-700">Larger Text</span>
                </div>
                <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${settings.largeText ? 'bg-teal-500 justify-end' : 'bg-slate-300 justify-start'}`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                </div>
              </button>

              <button 
                onClick={() => toggleSetting('highContrast')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${settings.highContrast ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-circle-half-stroke text-slate-500"></i>
                  <span className="font-bold text-sm text-slate-700">High Contrast</span>
                </div>
                <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${settings.highContrast ? 'bg-teal-500 justify-end' : 'bg-slate-300 justify-start'}`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                </div>
              </button>

              <button 
                onClick={() => toggleSetting('grayscale')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${settings.grayscale ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-droplet-slash text-slate-500"></i>
                  <span className="font-bold text-sm text-slate-700">Grayscale</span>
                </div>
                <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${settings.grayscale ? 'bg-teal-500 justify-end' : 'bg-slate-300 justify-start'}`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                </div>
              </button>

              <button 
                onClick={() => toggleSetting('highlightLinks')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${settings.highlightLinks ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-link text-slate-500"></i>
                  <span className="font-bold text-sm text-slate-700">Highlight Links</span>
                </div>
                <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${settings.highlightLinks ? 'bg-teal-500 justify-end' : 'bg-slate-300 justify-start'}`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                </div>
              </button>

              <button 
                onClick={() => toggleSetting('dyslexiaFont')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${settings.dyslexiaFont ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-font text-slate-500"></i>
                  <span className="font-bold text-sm text-slate-700">Dyslexia Friendly</span>
                </div>
                <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${settings.dyslexiaFont ? 'bg-teal-500 justify-end' : 'bg-slate-300 justify-start'}`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                </div>
              </button>

              <div className="pt-2">
                <button 
                  onClick={() => setSettings({ largeText: false, highContrast: false, grayscale: false, highlightLinks: false, dyslexiaFont: false })}
                  className="w-full py-2 text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors uppercase tracking-widest"
                >
                  Reset Settings
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:bg-blue-700 transition-all hover:scale-110 active:scale-95"
          aria-label="Accessibility Options"
        >
          <i className="fa-solid fa-universal-access"></i>
        </button>
      </div>
    </>
  );
};

export default AccessibilityWidget;
