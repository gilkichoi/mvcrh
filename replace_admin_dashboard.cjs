const fs = require('fs');

const code = `import React, { useState } from 'react';
import { DetailedDepartment, HospitalService, Resource, FeedbackEntry, SocialLinks } from '../types';

interface AdminDashboardProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  departments: DetailedDepartment[];
  setDepartments: React.Dispatch<React.SetStateAction<DetailedDepartment[]>>;
  services: HospitalService[];
  setServices: React.Dispatch<React.SetStateAction<HospitalService[]>>;
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  feedback: FeedbackEntry[];
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackEntry[]>>;
  socialLinks: SocialLinks;
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLinks>>;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isLoggedIn,
  setIsLoggedIn,
  departments,
  setDepartments,
  services,
  setServices,
  resources,
  setResources,
  feedback,
  setFeedback,
  socialLinks,
  setSocialLinks,
  onExit
}) => {
  const [activeTab, setActiveTab] = useState<'departments' | 'services' | 'resources' | 'feedback' | 'settings'>('departments');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Modals state
  const [deptModalOpen, setDeptModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<DetailedDepartment | null>(null);

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<HospitalService | null>(null);

  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. Hint: use admin/admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Departments
  const deleteDepartment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(prev => prev.filter(d => d.id !== id));
    }
  };

  const saveDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newDept: DetailedDepartment = {
      id: editingDept?.id || formData.get('id') as string,
      name: formData.get('name') as string,
      icon: formData.get('icon') as string,
      description: formData.get('description') as string,
      longDescription: formData.get('longDescription') as string,
      image: formData.get('image') as string,
      subServices: editingDept?.subServices || [],
      galleryImages: editingDept?.galleryImages || [],
      serviceCharter: editingDept?.serviceCharter || []
    };

    if (editingDept) {
      setDepartments(prev => prev.map(d => d.id === newDept.id ? newDept : d));
    } else {
      setDepartments(prev => [...prev, newDept]);
    }
    setDeptModalOpen(false);
  };

  // Services
  const deleteService = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  const saveService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSvc: HospitalService = {
      id: editingService?.id || formData.get('id') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      available: formData.get('available') as string
    };

    if (editingService) {
      setServices(prev => prev.map(s => s.id === newSvc.id ? newSvc : s));
    } else {
      setServices(prev => [...prev, newSvc]);
    }
    setServiceModalOpen(false);
  };

  // Resources
  const deleteResource = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setResources(prev => prev.filter(r => r.id !== id));
    }
  };

  const saveResource = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRes: Resource = {
      id: editingResource?.id || 'res-' + Date.now().toString(),
      title: formData.get('title') as string,
      category: formData.get('category') as any,
      description: formData.get('description') as string,
      fileType: formData.get('fileType') as any,
      fileSize: formData.get('fileSize') as string,
      downloadUrl: formData.get('downloadUrl') as string
    };

    if (editingResource) {
      setResources(prev => prev.map(r => r.id === newRes.id ? newRes : r));
    } else {
      setResources(prev => [...prev, newRes]);
    }
    setResourceModalOpen(false);
  };


  const markFeedbackRead = (id: string) => {
    setFeedback(prev => prev.map(f => f.id === id ? { ...f, status: 'read' as const } : f));
  };

  const handleSocialChange = (key: keyof SocialLinks, value: string) => {
    setSocialLinks(prev => ({ ...prev, [key]: value }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden w-full max-w-md animate-in zoom-in duration-300">
          <div className="bg-teal-600 p-10 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4">
              <i className="fa-solid fa-lock"></i>
            </div>
            <h2 className="text-2xl font-bold text-white">Staff Login</h2>
            <p className="text-teal-100 text-sm mt-2">Moi Voi Hospital Admin Portal</p>
          </div>
          <form onSubmit={handleLogin} className="p-10 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation"></i> {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                placeholder="Enter password"
                required
              />
            </div>
            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all pt-1">
              Secure Login <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'departments', icon: 'fa-building', label: 'Departments' },
    { id: 'services', icon: 'fa-stethoscope', label: 'Services' },
    { id: 'resources', icon: 'fa-file-lines', label: 'Documents' },
    { id: 'feedback', icon: 'fa-comments', label: 'Feedback', badge: feedback.filter(f => f.status === 'new').length || null },
    { id: 'settings', icon: 'fa-gear', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-xl">
              <i className="fa-solid fa-house-medical text-white"></i>
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wide">Moi Voi Hospital</h2>
              <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={\`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all \${
                activeTab === item.id 
                ? 'bg-teal-600 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }\`}
            >
              <div className="flex items-center gap-3">
                <i className={\`fa-solid \${item.icon} w-5\`}></i>
                <span className="text-sm font-bold">{item.label}</span>
              </div>
              {item.badge ? (
                <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{item.badge}</span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className="text-sm font-bold">Sign Out</span>
          </button>
          <button 
            onClick={onExit}
            className="w-full mt-2 text-[10px] font-bold text-teal-600 uppercase tracking-widest text-center"
          >
            View Live Site
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-xl font-bold text-slate-900 capitalize">{activeTab} Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">Welcome, <span className="font-bold text-slate-900">Admin</span></span>
            <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-xs shadow-sm">A</div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* DEPARTMENTS TAB */}
          {activeTab === 'departments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm">Manage hospital clinical departments and specialties.</p>
                <button 
                  onClick={() => { setEditingDept(null); setDeptModalOpen(true); }}
                  className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-teal-700 transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-plus"></i> New Department
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dept Name</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Icon</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {departments.map(dept => (
                      <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={dept.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <span className="font-bold text-slate-900 text-sm">{dept.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <i className={\`fa-solid \${dept.icon} text-teal-600\`}></i>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-xs text-slate-500 truncate">{dept.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => { setEditingDept(dept); setDeptModalOpen(true); }}
                              className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all"><i className="fa-solid fa-pen text-[10px]"></i></button>
                            <button 
                              onClick={() => deleteDepartment(dept.id)}
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><i className="fa-solid fa-trash text-[10px]"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm">Manage out-patient and general services.</p>
                <button 
                  onClick={() => { setEditingService(null); setServiceModalOpen(true); }}
                  className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-teal-700 transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-plus"></i> Add Service
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Available</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {services.map(svc => (
                      <tr key={svc.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-900 text-sm">{svc.title}</span>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-xs text-slate-500 truncate">{svc.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-1 bg-slate-100 rounded-md font-medium">{svc.available}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => { setEditingService(svc); setServiceModalOpen(true); }}
                              className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all"><i className="fa-solid fa-pen text-[10px]"></i></button>
                            <button 
                              onClick={() => deleteService(svc.id)}
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><i className="fa-solid fa-trash text-[10px]"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm">Manage downloadable documents, forms and resources.</p>
                <button 
                  onClick={() => { setEditingResource(null); setResourceModalOpen(true); }}
                  className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-teal-700 transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-upload"></i> Upload Document
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">File Info</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {resources.map(res => (
                      <tr key={res.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-900 text-sm">{res.title}</span>
                          <p className="text-[10px] text-slate-400 max-w-[200px] truncate">{res.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-1 bg-slate-100 rounded-md font-medium">{res.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 text-slate-500 rounded">{res.fileType}</span>
                            <span className="text-xs text-slate-500">{res.fileSize}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => { setEditingResource(res); setResourceModalOpen(true); }}
                              className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all"><i className="fa-solid fa-pen text-[10px]"></i></button>
                            <button 
                              onClick={() => deleteResource(res.id)}
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><i className="fa-solid fa-trash text-[10px]"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FEEDBACK TAB */}
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Submissions</p>
                  <p className="text-3xl font-black text-slate-900">{feedback.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-1">Unread Items</p>
                  <p className="text-3xl font-black text-teal-600">{feedback.filter(f => f.status === 'new').length}</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Patient</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Comment</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rating</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {feedback.map(item => (
                      <tr key={item.id} className={\`hover:bg-slate-50/50 transition-colors \${item.status === 'new' ? 'bg-teal-50/20' : ''}\`}>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                            <p className="text-[10px] text-slate-400">{item.date}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-1 bg-slate-100 rounded-md font-medium">{item.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-600 line-clamp-1 max-w-xs">{item.comments}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {[...Array(item.rating)].map((_, i) => <i key={i} className="fa-solid fa-star text-[10px] text-amber-400"></i>)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={\`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded \${
                            item.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                          }\`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {item.status === 'new' && (
                            <button 
                              onClick={() => markFeedbackRead(item.id)}
                              className="text-teal-600 text-xs font-bold hover:underline"
                            >
                              Mark Read
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-globe text-teal-600"></i> Hospital Contact Info
                </h2>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hospital Official Name</label>
                    <input type="text" defaultValue="Moi Voi County Referral Hospital" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Primary Official Email</label>
                    <input type="text" defaultValue="info@mvcrh.or.ke" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Main Emergency Number</label>
                    <input type="text" defaultValue="+254 722 000 000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                  </div>
                  <button className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-teal-700 transition-all w-full sm:w-auto">Save Global Settings</button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-share-nodes text-teal-600"></i> Social Media Handles
                </h2>
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <i className="fa-brands fa-facebook text-blue-600"></i> Facebook URL
                    </label>
                    <input 
                      type="text" 
                      value={socialLinks.facebook} 
                      onChange={(e) => handleSocialChange('facebook', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <i className="fa-brands fa-x-twitter text-slate-900"></i> Twitter/X URL
                    </label>
                    <input 
                      type="text" 
                      value={socialLinks.twitter} 
                      onChange={(e) => handleSocialChange('twitter', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <i className="fa-brands fa-instagram text-pink-600"></i> Instagram URL
                    </label>
                    <input 
                      type="text" 
                      value={socialLinks.instagram} 
                      onChange={(e) => handleSocialChange('instagram', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <i className="fa-brands fa-linkedin text-blue-800"></i> LinkedIn URL
                    </label>
                    <input 
                      type="text" 
                      value={socialLinks.linkedin} 
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 transition-all" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <i className="fa-brands fa-youtube text-red-600"></i> YouTube URL
                    </label>
                    <input 
                      type="text" 
                      value={socialLinks.youtube} 
                      onChange={(e) => handleSocialChange('youtube', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 transition-all" 
                    />
                  </div>
                  <button onClick={() => alert('Social links updated successfully!')} className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-teal-700 transition-all w-full">Update Social Channels</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODALS */}
      
      {/* Department Modal */}
      {deptModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingDept ? 'Edit Department' : 'New Department'}</h2>
              <button onClick={() => setDeptModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={saveDepartment} className="space-y-4">
              {!editingDept && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">ID</label>
                  <input name="id" required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                <input name="name" defaultValue={editingDept?.name} required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Icon (FontAwesome class)</label>
                <input name="icon" defaultValue={editingDept?.icon || 'fa-building'} required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Short Description</label>
                <input name="description" defaultValue={editingDept?.description} required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Long Description</label>
                <textarea name="longDescription" defaultValue={editingDept?.longDescription} required rows={3} className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image URL</label>
                <input name="image" defaultValue={editingDept?.image} required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl mt-4 hover:bg-teal-700">Save Department</button>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {serviceModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingService ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setServiceModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={saveService} className="space-y-4">
              {!editingService && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">ID</label>
                  <input name="id" required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                <input name="title" defaultValue={editingService?.title} required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                <textarea name="description" defaultValue={editingService?.description} required rows={3} className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Available (e.g. Mon - Fri, 8AM - 5PM)</label>
                <input name="available" defaultValue={editingService?.available} required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl mt-4 hover:bg-teal-700">Save Service</button>
            </form>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {resourceModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingResource ? 'Edit Document' : 'Upload Document'}</h2>
              <button onClick={() => setResourceModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={saveResource} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                <input name="title" defaultValue={editingResource?.title} required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                <select name="category" defaultValue={editingResource?.category || 'Hospital Forms'} className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500">
                  <option value="Legislative Acts">Legislative Acts</option>
                  <option value="Hospital Forms">Hospital Forms</option>
                  <option value="Finance & Tenders">Finance & Tenders</option>
                  <option value="Patient Guides">Patient Guides</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                <textarea name="description" defaultValue={editingResource?.description} required rows={2} className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">File Type</label>
                  <select name="fileType" defaultValue={editingResource?.fileType || 'PDF'} className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="XLSX">XLSX</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">File Size</label>
                  <input name="fileSize" defaultValue={editingResource?.fileSize || '100 KB'} required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Download URL</label>
                <input name="downloadUrl" defaultValue={editingResource?.downloadUrl || 'javascript:void(0)'} required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl mt-4 hover:bg-teal-700">{editingResource ? 'Save Changes' : 'Upload Document'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
`;
fs.writeFileSync('components/AdminDashboard.tsx', code);
console.log('Successfully replaced AdminDashboard.tsx');
