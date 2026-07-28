
import React, { useState } from 'react';
import { FeedbackEntry } from '../types';
import { useLanguage } from '../LanguageContext';

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackEntry) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const { tText } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Feedback',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create feedback object
    const newFeedback: FeedbackEntry = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      rating: rating,
      comments: formData.comments,
      date: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'new'
    };

    // Simulate API delay and Email dispatch
    setTimeout(() => {
      console.log('Feedback dispatched to info@mvcrh.or.ke');
      onSubmit(newFeedback);
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', category: 'General Feedback', comments: '' });
        setRating(0);
      }, 6000);
    }, 1500);
  };

  const categories = [
    'General Feedback',
    'Clinical Care',
    'Customer Service',
    'Facilities & Cleanliness',
    'Suggestions for Improvement'
  ];

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg shadow-emerald-200">
          <i className="fa-solid fa-envelope-circle-check"></i>
        </div>
        <h4 className="text-xl font-bold text-emerald-900 mb-2">{tText('Asante Sana!')}</h4>
        <p className="text-emerald-700 text-sm mb-4">
          {tText('Your feedback has been successfully emailed to our management team at')} <span className="font-bold underline">info@mvcrh.or.ke</span>.
        </p>
        <div className="bg-white/50 p-3 rounded-xl inline-block text-[10px] text-emerald-600 font-bold uppercase tracking-widest border border-emerald-100">
          {tText('Reference:')} #{Date.now().toString().slice(-6)}
        </div>
        <div className="block mt-6">
          <button 
            onClick={() => setSubmitted(false)}
            className="text-emerald-600 font-bold text-sm underline hover:text-emerald-800"
          >
            {tText('Submit another response')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-sm">
      <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
        <i className="fa-solid fa-pen-to-square text-teal-600"></i> {tText('Patient Experience')}
      </h4>
      <p className="text-slate-600 text-sm mb-6">{tText('Your voice matters to us. Your feedback will be sent directly to')} <span className="font-semibold">info@mvcrh.or.ke</span>.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{tText('Overall Experience')}</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="text-2xl transition-all hover:scale-125 focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <i className={`fa-star ${star <= (hover || rating) ? 'fa-solid text-amber-400' : 'fa-regular text-slate-300'}`}></i>
              </button>
            ))}
            {rating > 0 && <span className="ml-2 text-xs font-bold text-amber-600 self-center uppercase">{rating} / 5 stars</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{tText('Your Name')}</label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-sm"
              placeholder={tText('Full name')}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{tText('Category')}</label>
            <select
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-sm"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{tText(cat)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{tText('Comments & Suggestions')}</label>
          <textarea
            required
            rows={4}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-sm resize-none"
            placeholder={tText('Tell us about your experience...')}
            value={formData.comments}
            onChange={(e) => setFormData({...formData, comments: e.target.value})}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-teal-700 active:scale-[0.98] transition-all disabled:bg-slate-300 flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <><i className="fa-solid fa-paper-plane animate-pulse"></i> {tText('Sending...')}</>
          ) : (
            <><i className="fa-solid fa-paper-plane"></i> {tText('Submit Feedback')}</>
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
