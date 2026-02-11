
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
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/v1/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          setFormData({ name: '', phone: '', email: '', department: '', date: '', time: '', message: '' });
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMsg(errorData.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Network error. Check your connection to the hospital server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-teal-600 px-8 py-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Book a Consultation</h3>
            <p className="text-teal-100 text-sm">Real-time database persistence</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-8">
          {isSuccess ? (
            <div className="py-12 text-center animate-in fade-in">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Confirmed!</h4>
              <p className="text-slate-600">Your record has been saved to the hospital database.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i> {errorMsg}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Patient Full Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (e.g. 07xx)" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <select required name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                <option value="">Select Department</option>
                {departments.map(dept => <option key={dept.id} value={dept.name}>{dept.name}</option>)}
              </select>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                <input required type="text" name="time" value={formData.time} onChange={handleChange} placeholder="Preferred Time" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={2} placeholder="Symptom notes (optional)" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none"></textarea>
              <button type="submit" disabled={isSubmitting} className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-teal-700 disabled:bg-slate-300 flex items-center justify-center gap-3">
                {isSubmitting ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-calendar-plus"></i>}
                Secure Database Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
