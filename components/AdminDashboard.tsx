
import React, { useState } from 'react';
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

  const deleteDepartment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(prev => prev.filter(d => d.id !== id));
    }
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
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-teal-700 active:scale-[0.98] transition-all"
            >
              Sign In
            </button>
            <button 
              type="button" 
              onClick={onExit}
              className="w-full text-slate-400 font-bold py-2 text-sm hover:text-slate-600"
            >
              Back to Home
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg">
              <i className="fa-solid fa-house-medical"></i>
            </div>
            <div>
              <p className="font-bold text-sm leading-none">Moi Voi</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'departments', icon: 'fa-hospital', label: 'Departments' },
            { id: 'services', icon: 'fa-notes-medical', label: 'Services' },
            { id: 'resources', icon: 'fa-file-invoice', label: 'Documents' },
            { id: 'feedback', icon: 'fa-comments', label: 'Feedback', badge: feedback.filter(f => f.status === 'new').length },
            { id: 'settings', icon: 'fa-cog', label: 'Site Settings' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <i className={`fa-solid ${item.icon} w-5`}></i>
                <span className="text-sm font-semibold">{item.label}</span>
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
          {activeTab === 'departments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm">Manage hospital clinical departments and specialties.</p>
                <button 
                  onClick={() => alert('Department Editor coming soon in v1.1')}
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
                            <button className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all"><i className="fa-solid fa-pen text-[10px]"></i></button>
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
    </div>
  );
};

export default AdminDashboard;
