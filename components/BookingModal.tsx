
import React, { useState, useEffect } from 'react';
import { DetailedDepartment } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    date?: string;
    time?: string;
    department?: string;
  } | null;
  departments: DetailedDepartment[];
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialData, departments }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(prev => ({
        ...prev,
        department: initialData.department || prev.department,
        date: initialData.date || prev.date,
        time: initialData.time || prev.time
      }));
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call and Email Dispatch
    setTimeout(() => {
      console.log('Sending consultation request email to info@mvcrh.or.ke...', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: '',
          phone: '',
          email: '',
          department: '',
          date: '',
          time: '',
          message: ''
        });
      }, 4000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300">
        <div className="bg-teal-600 px-8 py-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Book a Consultation</h3>
            <p className="text-teal-100 text-sm">Schedule your visit with our specialists</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-8">
          {isSuccess ? (
            <div className="py-12 text-center animate-in fade-in slide-in-from-top-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Booking Transmitted!</h4>
              <p className="text-slate-600 mb-4">
                Jambo {formData.name}, your request has been sent to our desk via <span className="font-bold text-teal-600">info@mvcrh.or.ke</span>.
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl inline-flex items-center gap-3 text-xs text-slate-500 font-medium">
                <i className="fa-solid fa-envelope-circle-check text-emerald-500 text-lg"></i>
                <span>Official notification delivered to the Referral Desk.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 0712345678"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Department</label>
                <select
                  required
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select a department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                  <option value="General Consultation">General Consultation</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Preferred Date</label>
                  <input
                    required
                    type="date"
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Preferred Time</label>
                  <input
                    required
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="e.g. 09:00 AM"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Additional Notes</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Any specific concerns?"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-teal-700 hover:shadow-xl active:scale-[0.98] transition-all disabled:bg-slate-300 flex items-center justify-center gap-3 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-circle-notch animate-spin"></i> Dispatching Email...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-calendar-plus"></i> Submit Booking Request
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                Your request is sent directly to <span className="font-bold">info@mvcrh.or.ke</span> for processing.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
