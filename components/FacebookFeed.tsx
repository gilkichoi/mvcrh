import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (node?: HTMLElement) => void;
      };
    };
  }
}

interface FacebookFeedProps {
  compact?: boolean;
  className?: string;
}

export const FacebookFeed: React.FC<FacebookFeedProps> = ({ compact = false, className = '' }) => {
  const { tText } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'events'>('timeline');

  const facebookPageUrl = 'https://www.facebook.com/people/Moi-County-Referral-Hospital-Voi/100089810477442/';
  const numericIdPageUrl = 'https://www.facebook.com/100089810477442';

  const encodedUrl = encodeURIComponent(numericIdPageUrl);
  const iframeSrc = `https://www.facebook.com/plugins/page.php?href=${encodedUrl}&tabs=${activeTab}&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  useEffect(() => {
    if (window.FB && window.FB.XFBML) {
      try {
        window.FB.XFBML.parse();
      } catch (err) {
        console.warn('FB SDK parse warning:', err);
      }
    }
  }, [activeTab]);

  return (
    <div className={`w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* Plugin Top Bar */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl flex-shrink-0 shadow-md">
            <i className="fa-brands fa-facebook-f"></i>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-sm sm:text-base text-white">Moi County Referral Hospital - Voi</h4>
              <i className="fa-solid fa-circle-check text-blue-400 text-xs" title="Official Verified Page"></i>
            </div>
            <p className="text-slate-400 text-[11px] font-medium flex items-center gap-2">
              <span>Official Facebook Page</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
              <span className="text-teal-400">Live Timeline</span>
            </p>
          </div>
        </div>

        <a
          href={facebookPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
        >
          <span>{tText('Open Page')}</span>
          <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
        </a>
      </div>

      {/* Tabs bar if not compact */}
      {!compact && (
        <div className="bg-slate-100 px-4 py-2 flex items-center justify-between border-b border-slate-200 text-xs">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === 'timeline' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-stream mr-1.5"></i>
              {tText('Timeline')}
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === 'events' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-regular fa-calendar-days mr-1.5"></i>
              {tText('Events')}
            </button>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">{tText('Live from facebook.com')}</span>
        </div>
      )}

      {/* Plugin Frame Viewport */}
      <div className="p-3 sm:p-4 bg-slate-50 flex flex-col items-center justify-center relative min-h-[380px]">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-400 z-10 p-4">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2"></div>
            <p className="text-xs font-semibold text-slate-500">{tText('Loading official Facebook feed...')}</p>
          </div>
        )}

        <div className="w-full max-w-[500px] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex justify-center">
          <iframe
            src={iframeSrc}
            width="500"
            height={compact ? "450" : "500"}
            style={{ border: 'none', overflow: 'hidden', width: '100%', maxWidth: '500px' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            onLoad={() => setIsLoaded(true)}
            title="Moi County Referral Hospital Facebook Feed"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FacebookFeed;
