const fs = require('fs');

let code = fs.readFileSync('components/AdminDashboard.tsx', 'utf8');

const oldNav = `const navItems = [
    { id: 'departments', icon: 'fa-building', label: 'Departments' },
    { id: 'services', icon: 'fa-stethoscope', label: 'Services' },
    { id: 'resources', icon: 'fa-file-lines', label: 'Documents' },
    { id: 'feedback', icon: 'fa-comments', label: 'Feedback', badge: feedback.filter(f => f.status === 'new').length || null },
    { id: 'settings', icon: 'fa-gear', label: 'Settings' }
  ];`;

const newNav = `const navItems = [
    { id: 'departments', icon: 'fa-building', label: 'Departments' },
    { id: 'services', icon: 'fa-stethoscope', label: 'Services' },
    { id: 'news', icon: 'fa-newspaper', label: 'News' },
    { id: 'events', icon: 'fa-calendar-days', label: 'Events' },
    { id: 'resources', icon: 'fa-file-lines', label: 'Documents' },
    { id: 'feedback', icon: 'fa-comments', label: 'Feedback', badge: feedback.filter(f => f.status === 'new').length || null },
    { id: 'settings', icon: 'fa-gear', label: 'Settings' }
  ];`;
code = code.replace(oldNav, newNav);

const newsAndEventsPanels = `
          {/* News Tab */}
          {activeTab === 'news' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-semibold text-slate-800">News Management</h3>
                <button 
                  onClick={() => {
                    const newNews = { id: Date.now(), title: 'New Article', date: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }), category: 'General', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400', description: 'Description here' };
                    setNewsItems([...newsItems, newNews]);
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  <i className="fa-solid fa-plus mr-2"></i> Add News
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {newsItems.map(item => (
                  <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <input 
                        type="text" 
                        value={item.title}
                        onChange={(e) => setNewsItems(newsItems.map(n => n.id === item.id ? {...n, title: e.target.value} : n))}
                        className="font-bold text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:border-teal-500 outline-none w-full pb-1"
                        placeholder="News Title"
                      />
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          value={item.date}
                          onChange={(e) => setNewsItems(newsItems.map(n => n.id === item.id ? {...n, date: e.target.value} : n))}
                          className="text-sm text-slate-500 bg-transparent border-b border-dashed border-slate-300 focus:border-teal-500 outline-none w-32 pb-1"
                          placeholder="Date"
                        />
                        <input 
                          type="text" 
                          value={item.category}
                          onChange={(e) => setNewsItems(newsItems.map(n => n.id === item.id ? {...n, category: e.target.value} : n))}
                          className="text-sm text-teal-600 bg-transparent border-b border-dashed border-slate-300 focus:border-teal-500 outline-none w-48 pb-1"
                          placeholder="Category"
                        />
                      </div>
                      <textarea
                        value={item.description}
                        onChange={(e) => setNewsItems(newsItems.map(n => n.id === item.id ? {...n, description: e.target.value} : n))}
                        className="text-sm text-slate-600 bg-transparent border border-dashed border-slate-300 focus:border-teal-500 outline-none w-full p-2 rounded resize-none"
                        placeholder="Description"
                        rows={2}
                      />
                      <input 
                        type="text" 
                        value={item.image}
                        onChange={(e) => setNewsItems(newsItems.map(n => n.id === item.id ? {...n, image: e.target.value} : n))}
                        className="text-sm text-slate-500 bg-transparent border-b border-dashed border-slate-300 focus:border-teal-500 outline-none w-full pb-1"
                        placeholder="Image URL"
                      />
                    </div>
                    <button 
                      onClick={() => setNewsItems(newsItems.filter(n => n.id !== item.id))}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Delete News"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-semibold text-slate-800">Events Management</h3>
                <button 
                  onClick={() => {
                    const newEvent = { id: Date.now(), title: 'New Event', date: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }), time: '09:00 AM - 12:00 PM', location: 'Location', icon: 'fa-calendar' };
                    setEventItems([...eventItems, newEvent]);
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  <i className="fa-solid fa-plus mr-2"></i> Add Event
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {eventItems.map(item => (
                  <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <input 
                          type="text" 
                          value={item.icon}
                          onChange={(e) => setEventItems(eventItems.map(ev => ev.id === item.id ? {...ev, icon: e.target.value} : ev))}
                          className="text-sm text-slate-500 bg-transparent border-b border-dashed border-slate-300 focus:border-teal-500 outline-none w-24 pb-1"
                          placeholder="Icon (e.g. fa-star)"
                        />
                        <input 
                          type="text" 
                          value={item.title}
                          onChange={(e) => setEventItems(eventItems.map(ev => ev.id === item.id ? {...ev, title: e.target.value} : ev))}
                          className="font-bold text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:border-teal-500 outline-none w-full pb-1"
                          placeholder="Event Title"
                        />
                      </div>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          value={item.date}
                          onChange={(e) => setEventItems(eventItems.map(ev => ev.id === item.id ? {...ev, date: e.target.value} : ev))}
                          className="text-sm text-slate-500 bg-transparent border-b border-dashed border-slate-300 focus:border-teal-500 outline-none w-32 pb-1"
                          placeholder="Date"
                        />
                        <input 
                          type="text" 
                          value={item.time}
                          onChange={(e) => setEventItems(eventItems.map(ev => ev.id === item.id ? {...ev, time: e.target.value} : ev))}
                          className="text-sm text-slate-500 bg-transparent border-b border-dashed border-slate-300 focus:border-teal-500 outline-none w-48 pb-1"
                          placeholder="Time"
                        />
                        <input 
                          type="text" 
                          value={item.location}
                          onChange={(e) => setEventItems(eventItems.map(ev => ev.id === item.id ? {...ev, location: e.target.value} : ev))}
                          className="text-sm text-slate-500 bg-transparent border-b border-dashed border-slate-300 focus:border-teal-500 outline-none w-full pb-1"
                          placeholder="Location"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => setEventItems(eventItems.filter(ev => ev.id !== item.id))}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Delete Event"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
`;

code = code.replace(/\{\/\* Settings Tab \*\/\}/, newsAndEventsPanels + '\n\n          {/* Settings Tab */}');

fs.writeFileSync('components/AdminDashboard.tsx', code);
