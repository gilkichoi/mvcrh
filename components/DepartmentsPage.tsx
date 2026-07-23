import React, { useState, useMemo } from 'react';
import { DetailedDepartment } from '../types';

interface DepartmentsPageProps {
  departments: DetailedDepartment[];
  isDataLoading: boolean;
  setSelectedDept: (dept: DetailedDepartment) => void;
}

const DepartmentSkeleton = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
    <div className="h-48 bg-slate-200"></div>
    <div className="p-8">
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6 mb-6"></div>
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
    </div>
  </div>
);

const DepartmentsPage: React.FC<DepartmentsPageProps> = ({ departments, isDataLoading, setSelectedDept }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDepartments = useMemo(() => {
    return departments.filter(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, departments]);

  return (
    <section className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Our Center of Excellence</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Medical Departments</h3>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
          </div>
          <input
            type="text"
            placeholder="Search for a department..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-teal-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isDataLoading ? (
            Array.from({ length: 6 }).map((_, i) => <DepartmentSkeleton key={i} />)
          ) : (
            filteredDepartments.map((dept) => (
              <div key={dept.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={dept.image} 
                    alt={dept.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{dept.name}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {dept.description}
                  </p>
                  <button 
                    onClick={() => setSelectedDept(dept as DetailedDepartment)}
                    className="text-teal-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Learn More <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsPage;
