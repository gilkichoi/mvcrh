import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../constants';

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      setIsAnimating(false);
    }, 500);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <div className="relative bg-slate-50 rounded-3xl p-8 shadow-sm border border-slate-100 overflow-hidden">
      {/* Background decoration */}
      <i className="fa-solid fa-quote-right absolute top-4 right-8 text-8xl text-teal-100 opacity-30 pointer-events-none" aria-hidden="true"></i>
      
      <div className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 scale-95 translate-x-4' : 'opacity-100 scale-100 translate-x-0'}`}>
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fa-solid fa-star text-sm ${i < current.rating ? 'text-amber-400' : 'text-slate-200'}`}
              aria-hidden="true"
            ></i>
          ))}
        </div>
        
        <blockquote className="text-xl text-slate-700 italic font-medium leading-relaxed mb-8">
          "{current.quote}"
        </blockquote>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {current.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-900">{current.name}</p>
              <p className="text-xs text-teal-600 font-bold tracking-wider flex items-center gap-1 uppercase">
                <i className="fa-solid fa-location-dot"></i> {current.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-8 bg-teal-500' : 'w-2 bg-slate-200'}`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="Previous testimonial"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="Next testimonial"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
