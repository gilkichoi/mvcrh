import React, { useState } from 'react';
import { DetailedDepartment, HospitalService, Resource, FeedbackEntry, SocialLinks, NewsItem, EventItem } from '../types';

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
  newsItems: NewsItem[];
  setNewsItems: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  eventItems: EventItem[];
  setEventItems: React.Dispatch<React.SetStateAction<EventItem[]>>;
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
  newsItems,
  setNewsItems,
  eventItems,
  setEventItems,
  onExit
}) => {
  const [activeTab, setActiveTab] = useState<'departments' | 'services' | 'resources' | 'feedback' | 'settings' | 'news' | 'events'>('departments');
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

  // News State
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsFilter, setNewsFilter] = useState<'all' | 'active' | 'archived'>('all');
  const [newsGallery, setNewsGallery] = useState<{ url: string; caption?: string; alt?: string }[]>([]);

  // Events State
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [eventsFilter, setEventsFilter] = useState<'all' | 'active' | 'archived'>('all');
  const [eventGallery, setEventGallery] = useState<{ url: string; caption?: string; alt?: string }[]>([]);

  // News handlers
  const openAddNews = () => {
    setEditingNews(null);
    setNewsGallery([]);
    setNewsModalOpen(true);
  };

  const openEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setNewsGallery(item.gallery || []);
    setNewsModalOpen(true);
  };

  const toggleArchiveNews = (id: number | string) => {
    setNewsItems(prev => prev.map(item => item.id === id ? { ...item, archived: !item.archived } : item));
  };

  const deleteNews = (id: number | string) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      setNewsItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const saveNews = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newNews: NewsItem = {
      id: editingNews?.id || 'news-' + Date.now(),
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      category: formData.get('category') as string,
      department: formData.get('department') as string,
      image: (formData.get('image') as string) || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      description: formData.get('description') as string,
      content: formData.get('content') as string,
      gallery: newsGallery.filter(g => g.url.trim() !== '').map(g => ({ url: g.url, caption: g.caption || '', alt: g.caption || 'News Image' })),
      archived: formData.get('archived') === 'on'
    };

    if (editingNews) {
      setNewsItems(prev => prev.map(n => n.id === newNews.id ? newNews : n));
    } else {
      setNewsItems(prev => [newNews, ...prev]);
    }
    setNewsModalOpen(false);
  };

  // Event handlers
  const openAddEvent = () => {
    setEditingEvent(null);
    setEventGallery([]);
    setEventModalOpen(true);
  };

  const openEditEvent = (item: EventItem) => {
    setEditingEvent(item);
    setEventGallery(item.gallery || []);
    setEventModalOpen(true);
  };

  const toggleArchiveEvent = (id: number | string) => {
    setEventItems(prev => prev.map(item => item.id === id ? { ...item, archived: !item.archived } : item));
  };

  const deleteEvent = (id: number | string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEventItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const saveEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEv: EventItem = {
      id: editingEvent?.id || 'ev-' + Date.now(),
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      location: formData.get('location') as string,
      department: formData.get('department') as string,
      icon: (formData.get('icon') as string) || 'fa-calendar-days',
      image: (formData.get('image') as string) || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
      description: formData.get('description') as string,
      gallery: eventGallery.filter(g => g.url.trim() !== '').map(g => ({ url: g.url, caption: g.caption || '', alt: g.caption || 'Event Image' })),
      archived: formData.get('archived') === 'on'
    };

    if (editingEvent) {
      setEventItems(prev => prev.map(ev => ev.id === newEv.id ? newEv : ev));
    } else {
      setEventItems(prev => [newEv, ...prev]);
    }
    setEventModalOpen(false);
  };

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
      serviceCharter: editingDept?.serviceCharter || [],
      events: editingDept?.events || []
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
    { id: 'news', icon: 'fa-newspaper', label: 'News' },
    { id: 'events', icon: 'fa-calendar-days', label: 'Events' },
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
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-teal-600 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <i className={`fa-solid ${item.icon} w-5`}></i>
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
                          <i className={`fa-solid ${dept.icon} text-teal-600`}></i>
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
                      <tr key={item.id} className={`hover:bg-slate-50/50 transition-colors ${item.status === 'new' ? 'bg-teal-50/20' : ''}`}>
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
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                            item.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                          }`}>
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

          {/* NEWS TAB */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Hospital News & Announcements</h2>
                  <p className="text-slate-500 text-sm">Add, edit, archive, and manage news articles, main pictures, galleries, and department tags.</p>
                </div>
                <button 
                  onClick={openAddNews}
                  className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-teal-700 transition-all flex items-center gap-2 self-start sm:self-auto"
                >
                  <i className="fa-solid fa-plus"></i> Add News Article
                </button>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 border-b border-slate-200 pb-3">
                <button 
                  onClick={() => setNewsFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${newsFilter === 'all' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  All News ({newsItems.length})
                </button>
                <button 
                  onClick={() => setNewsFilter('active')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${newsFilter === 'active' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  Active ({newsItems.filter(n => !n.archived).length})
                </button>
                <button 
                  onClick={() => setNewsFilter('archived')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${newsFilter === 'archived' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  Archived ({newsItems.filter(n => n.archived).length})
                </button>
              </div>

              {/* News Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems
                  .filter(item => {
                    if (newsFilter === 'active') return !item.archived;
                    if (newsFilter === 'archived') return item.archived;
                    return true;
                  })
                  .map(item => (
                    <div key={item.id} className={`bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col ${item.archived ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200'}`}>
                      <div className="h-44 relative bg-slate-100 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[80%]">
                          <span className="bg-teal-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                            {item.category}
                          </span>
                          {item.department && (
                            <span className="bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                              {item.department}
                            </span>
                          )}
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm ${item.archived ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
                            {item.archived ? 'Archived' : 'Active'}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-2">
                          <i className="fa-regular fa-calendar text-teal-600"></i> {item.date}
                        </p>
                        <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-slate-600 text-xs line-clamp-3 mb-4 flex-1">{item.description}</p>

                        {item.gallery && item.gallery.length > 0 && (
                          <p className="text-[11px] font-bold text-teal-600 mb-4 flex items-center gap-1.5">
                            <i className="fa-solid fa-images"></i> {item.gallery.length} Gallery Photos
                          </p>
                        )}

                        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto gap-2">
                          <button 
                            onClick={() => openEditNews(item)}
                            className="flex-1 bg-slate-100 text-slate-700 hover:bg-slate-200 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                          >
                            <i className="fa-solid fa-pen"></i> Edit
                          </button>
                          <button 
                            onClick={() => toggleArchiveNews(item.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${item.archived ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
                            title={item.archived ? "Unarchive" : "Archive"}
                          >
                            <i className={`fa-solid ${item.archived ? 'fa-box-open' : 'fa-box-archive'}`}></i>
                            {item.archived ? 'Restore' : 'Archive'}
                          </button>
                          <button 
                            onClick={() => deleteNews(item.id)}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Hospital Events & Workshops</h2>
                  <p className="text-slate-500 text-sm">Add, edit, archive, and manage upcoming hospital events, photos, dates, locations, and departments.</p>
                </div>
                <button 
                  onClick={openAddEvent}
                  className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-teal-700 transition-all flex items-center gap-2 self-start sm:self-auto"
                >
                  <i className="fa-solid fa-plus"></i> Add Event
                </button>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 border-b border-slate-200 pb-3">
                <button 
                  onClick={() => setEventsFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${eventsFilter === 'all' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  All Events ({eventItems.length})
                </button>
                <button 
                  onClick={() => setEventsFilter('active')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${eventsFilter === 'active' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  Active ({eventItems.filter(e => !e.archived).length})
                </button>
                <button 
                  onClick={() => setEventsFilter('archived')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${eventsFilter === 'archived' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  Archived ({eventItems.filter(e => e.archived).length})
                </button>
              </div>

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventItems
                  .filter(item => {
                    if (eventsFilter === 'active') return !item.archived;
                    if (eventsFilter === 'archived') return item.archived;
                    return true;
                  })
                  .map(item => (
                    <div key={item.id} className={`bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col ${item.archived ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200'}`}>
                      <div className="h-44 relative bg-slate-100 overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-teal-800 flex items-center justify-center text-white text-4xl">
                            <i className={`fa-solid ${item.icon || 'fa-calendar-days'}`}></i>
                          </div>
                        )}
                        {item.department && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                              {item.department}
                            </span>
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm ${item.archived ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
                            {item.archived ? 'Archived' : 'Active'}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm">
                            <i className={`fa-solid ${item.icon || 'fa-calendar-days'}`}></i>
                          </div>
                          <h3 className="font-bold text-slate-900 text-base line-clamp-1">{item.title}</h3>
                        </div>

                        <div className="space-y-1.5 my-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <p className="flex items-center gap-2 font-semibold">
                            <i className="fa-regular fa-calendar text-teal-600 w-4"></i> {item.date}
                          </p>
                          <p className="flex items-center gap-2 font-semibold">
                            <i className="fa-regular fa-clock text-teal-600 w-4"></i> {item.time}
                          </p>
                          <p className="flex items-center gap-2 font-semibold">
                            <i className="fa-solid fa-location-dot text-teal-600 w-4"></i> {item.location}
                          </p>
                        </div>

                        {item.description && (
                          <p className="text-slate-600 text-xs line-clamp-2 mb-4">{item.description}</p>
                        )}

                        {item.gallery && item.gallery.length > 0 && (
                          <p className="text-[11px] font-bold text-teal-600 mb-4 flex items-center gap-1.5">
                            <i className="fa-solid fa-images"></i> {item.gallery.length} Gallery Photos
                          </p>
                        )}

                        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto gap-2">
                          <button 
                            onClick={() => openEditEvent(item)}
                            className="flex-1 bg-slate-100 text-slate-700 hover:bg-slate-200 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                          >
                            <i className="fa-solid fa-pen"></i> Edit
                          </button>
                          <button 
                            onClick={() => toggleArchiveEvent(item.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${item.archived ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
                            title={item.archived ? "Unarchive" : "Archive"}
                          >
                            <i className={`fa-solid ${item.archived ? 'fa-box-open' : 'fa-box-archive'}`}></i>
                            {item.archived ? 'Restore' : 'Archive'}
                          </button>
                          <button 
                            onClick={() => deleteEvent(item.id)}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Gallery Images</label>
                <div className="space-y-3">
                  {(editingDept?.galleryImages || []).map((img, i) => (
                    <div key={i} className="flex gap-2 items-start border border-slate-200 p-2 rounded-lg bg-slate-50">
                      <div className="flex-1 space-y-2">
                        <input type="text" value={img.url} onChange={(e) => {
                          const newImages = [...(editingDept?.galleryImages || [])];
                          newImages[i].url = e.target.value;
                          setEditingDept({...editingDept, galleryImages: newImages} as any);
                        }} placeholder="Image URL" className="w-full px-2 py-1 border rounded text-sm" />
                        <div className="flex gap-2">
                          <input type="text" value={img.caption} onChange={(e) => {
                            const newImages = [...(editingDept?.galleryImages || [])];
                            newImages[i].caption = e.target.value;
                            setEditingDept({...editingDept, galleryImages: newImages} as any);
                          }} placeholder="Caption" className="w-full px-2 py-1 border rounded text-sm" />
                          <input type="text" value={img.alt} onChange={(e) => {
                            const newImages = [...(editingDept?.galleryImages || [])];
                            newImages[i].alt = e.target.value;
                            setEditingDept({...editingDept, galleryImages: newImages} as any);
                          }} placeholder="Alt text" className="w-full px-2 py-1 border rounded text-sm" />
                        </div>
                      </div>
                      <button type="button" onClick={() => {
                        const newImages = [...(editingDept?.galleryImages || [])];
                        newImages.splice(i, 1);
                        setEditingDept({...editingDept, galleryImages: newImages} as any);
                      }} className="text-red-500 hover:bg-red-100 p-1 rounded">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => {
                    const newImages = [...(editingDept?.galleryImages || []), { url: '', caption: '', alt: '' }];
                    setEditingDept({...editingDept, galleryImages: newImages} as any);
                  }} className="text-teal-600 text-sm font-bold flex items-center gap-1">
                    <i className="fa-solid fa-plus"></i> Add Gallery Image
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Department Events</label>
                <div className="space-y-3">
                  {(editingDept?.events || []).map((ev, i) => (
                    <div key={i} className="flex gap-2 items-start border border-slate-200 p-2 rounded-lg bg-slate-50">
                      <div className="flex-1 space-y-2">
                        <input type="text" value={ev.title} onChange={(e) => {
                          const newEvents = [...(editingDept?.events || [])];
                          newEvents[i].title = e.target.value;
                          setEditingDept({...editingDept, events: newEvents} as any);
                        }} placeholder="Event Title" className="w-full px-2 py-1 border rounded text-sm" />
                        <div className="flex gap-2">
                          <input type="text" value={ev.date} onChange={(e) => {
                            const newEvents = [...(editingDept?.events || [])];
                            newEvents[i].date = e.target.value;
                            setEditingDept({...editingDept, events: newEvents} as any);
                          }} placeholder="Date" className="w-full px-2 py-1 border rounded text-sm" />
                          <input type="text" value={ev.time} onChange={(e) => {
                            const newEvents = [...(editingDept?.events || [])];
                            newEvents[i].time = e.target.value;
                            setEditingDept({...editingDept, events: newEvents} as any);
                          }} placeholder="Time" className="w-full px-2 py-1 border rounded text-sm" />
                        </div>
                        <textarea value={ev.description} onChange={(e) => {
                          const newEvents = [...(editingDept?.events || [])];
                          newEvents[i].description = e.target.value;
                          setEditingDept({...editingDept, events: newEvents} as any);
                        }} placeholder="Description" className="w-full px-2 py-1 border rounded text-sm resize-none" rows={2} />
                      </div>
                      <button type="button" onClick={() => {
                        const newEvents = [...(editingDept?.events || [])];
                        newEvents.splice(i, 1);
                        setEditingDept({...editingDept, events: newEvents} as any);
                      }} className="text-red-500 hover:bg-red-100 p-1 rounded">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => {
                    const newEvents = [...(editingDept?.events || []), { title: '', date: '', time: '', description: '' }];
                    setEditingDept({...editingDept, events: newEvents} as any);
                  }} className="text-teal-600 text-sm font-bold flex items-center gap-1">
                    <i className="fa-solid fa-plus"></i> Add Event
                  </button>
                </div>
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
                  <option value="Policies & Insurance">Policies & Insurance</option>
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

      {/* News Modal */}
      {newsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{editingNews ? 'Edit News Article' : 'Add News Article'}</h2>
                <p className="text-xs text-slate-500 font-medium">Configure news title, category, department, main picture, and photo gallery.</p>
              </div>
              <button onClick={() => setNewsModalOpen(false)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={saveNews} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Article Title *</label>
                <input name="title" defaultValue={editingNews?.title} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-slate-800" placeholder="e.g. New Digital X-Ray Machine Installed" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Date *</label>
                  <input name="date" defaultValue={editingNews?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g. Oct 10, 2026" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Category *</label>
                  <input name="category" defaultValue={editingNews?.category || 'Facility Upgrade'} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g. Health Campaign, Facility Upgrade" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Associated Department</label>
                <select name="department" defaultValue={editingNews?.department || 'All Departments'} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 font-medium">
                  <option value="All Departments">All Departments / General</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Main Picture URL *</label>
                <input 
                  name="image" 
                  defaultValue={editingNews?.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'} 
                  required 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 text-sm" 
                  placeholder="https://images.unsplash.com/..." 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Short Excerpt / Summary *</label>
                <textarea name="description" defaultValue={editingNews?.description} required rows={2} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 text-sm" placeholder="Brief 1-2 sentence description..."></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Full Article Content</label>
                <textarea name="content" defaultValue={editingNews?.content} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 text-sm" placeholder="Detailed story content..."></textarea>
              </div>

              {/* Gallery Images Management */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">Photo Gallery ({newsGallery.length} photos)</label>
                  <button 
                    type="button" 
                    onClick={() => setNewsGallery(prev => [...prev, { url: '', caption: '' }])}
                    className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-600 hover:text-white transition-all flex items-center gap-1"
                  >
                    <i className="fa-solid fa-plus text-[10px]"></i> Add Gallery Photo
                  </button>
                </div>

                {newsGallery.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No gallery photos added yet. Click above to add photo URLs.</p>
                ) : (
                  <div className="space-y-3">
                    {newsGallery.map((photo, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center">
                        <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border">
                          {photo.url ? <img src={photo.url} alt="Gallery" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs"><i className="fa-regular fa-image"></i></div>}
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                          <input 
                            type="text" 
                            placeholder="Image URL" 
                            value={photo.url}
                            onChange={(e) => {
                              const newUrl = e.target.value;
                              setNewsGallery(prev => prev.map((g, i) => i === idx ? { ...g, url: newUrl } : g));
                            }}
                            className="px-3 py-1.5 text-xs bg-slate-50 border rounded-lg outline-none focus:ring-1 focus:ring-teal-500"
                          />
                          <input 
                            type="text" 
                            placeholder="Caption / Description" 
                            value={photo.caption || ''}
                            onChange={(e) => {
                              const newCap = e.target.value;
                              setNewsGallery(prev => prev.map((g, i) => i === idx ? { ...g, caption: newCap } : g));
                            }}
                            className="px-3 py-1.5 text-xs bg-slate-50 border rounded-lg outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setNewsGallery(prev => prev.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Remove Photo"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Archive toggle */}
              <div className="flex items-center gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                <input 
                  type="checkbox" 
                  id="news-archived" 
                  name="archived" 
                  defaultChecked={editingNews?.archived || false} 
                  className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                />
                <label htmlFor="news-archived" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Archive this news article (Hides it from active news feed)
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setNewsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-colors shadow-md">
                  {editingNews ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {eventModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
                <p className="text-xs text-slate-500 font-medium">Configure event details, date, time, location, department, picture, and gallery.</p>
              </div>
              <button onClick={() => setEventModalOpen(false)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={saveEvent} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Event Title *</label>
                <input name="title" defaultValue={editingEvent?.title} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-800" placeholder="e.g. Community Blood Drive" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Date *</label>
                  <input name="date" defaultValue={editingEvent?.date || 'Oct 25, 2026'} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g. Oct 25, 2026" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Time *</label>
                  <input name="time" defaultValue={editingEvent?.time || '09:00 AM - 04:00 PM'} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g. 09:00 AM - 04:00 PM" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Location *</label>
                  <input name="location" defaultValue={editingEvent?.location || 'Main Hospital Grounds'} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g. Main Hospital Grounds" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">FontAwesome Icon</label>
                  <input name="icon" defaultValue={editingEvent?.icon || 'fa-droplet'} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g. fa-droplet, fa-calendar-days, fa-eye" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Associated Department</label>
                <select name="department" defaultValue={editingEvent?.department || 'All Departments'} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 font-medium">
                  <option value="All Departments">All Departments / General</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Main Event Picture URL</label>
                <input name="image" defaultValue={editingEvent?.image} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 text-sm" placeholder="https://images.unsplash.com/..." />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Event Description</label>
                <textarea name="description" defaultValue={editingEvent?.description} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 text-sm" placeholder="Details about this event..."></textarea>
              </div>

              {/* Gallery Images Management */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">Event Photo Gallery ({eventGallery.length} photos)</label>
                  <button 
                    type="button" 
                    onClick={() => setEventGallery(prev => [...prev, { url: '', caption: '' }])}
                    className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-600 hover:text-white transition-all flex items-center gap-1"
                  >
                    <i className="fa-solid fa-plus text-[10px]"></i> Add Photo
                  </button>
                </div>

                {eventGallery.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No gallery photos added yet.</p>
                ) : (
                  <div className="space-y-3">
                    {eventGallery.map((photo, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center">
                        <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border">
                          {photo.url ? <img src={photo.url} alt="Gallery" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs"><i className="fa-regular fa-image"></i></div>}
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                          <input 
                            type="text" 
                            placeholder="Image URL" 
                            value={photo.url}
                            onChange={(e) => {
                              const newUrl = e.target.value;
                              setEventGallery(prev => prev.map((g, i) => i === idx ? { ...g, url: newUrl } : g));
                            }}
                            className="px-3 py-1.5 text-xs bg-slate-50 border rounded-lg outline-none focus:ring-1 focus:ring-teal-500"
                          />
                          <input 
                            type="text" 
                            placeholder="Caption / Description" 
                            value={photo.caption || ''}
                            onChange={(e) => {
                              const newCap = e.target.value;
                              setEventGallery(prev => prev.map((g, i) => i === idx ? { ...g, caption: newCap } : g));
                            }}
                            className="px-3 py-1.5 text-xs bg-slate-50 border rounded-lg outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setEventGallery(prev => prev.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Remove Photo"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Archive toggle */}
              <div className="flex items-center gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                <input 
                  type="checkbox" 
                  id="event-archived" 
                  name="archived" 
                  defaultChecked={editingEvent?.archived || false} 
                  className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                />
                <label htmlFor="event-archived" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Archive this event (Hides it from active upcoming events)
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEventModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-colors shadow-md">
                  {editingEvent ? 'Save Changes' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
