const fs = require('fs');

let code = fs.readFileSync('components/AdminDashboard.tsx', 'utf8');

const oldGalleryBlock = `                  <button type="button" onClick={() => {
                    const newImages = [...(editingDept?.galleryImages || []), { url: '', caption: '', alt: '' }];
                    setEditingDept({...editingDept, galleryImages: newImages} as any);
                  }} className="text-teal-600 text-sm font-bold flex items-center gap-1">
                    <i className="fa-solid fa-plus"></i> Add Gallery Image
                  </button>
                </div>
              </div>`;

const newGalleryBlock = `                  <button type="button" onClick={() => {
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
              </div>`;

code = code.replace(oldGalleryBlock, newGalleryBlock);

// Also we must add events to newDept in saveDepartment
const oldSaveDept = `      galleryImages: editingDept?.galleryImages || [],
      serviceCharter: editingDept?.serviceCharter || []
    };`;

const newSaveDept = `      galleryImages: editingDept?.galleryImages || [],
      serviceCharter: editingDept?.serviceCharter || [],
      events: editingDept?.events || []
    };`;
code = code.replace(oldSaveDept, newSaveDept);

fs.writeFileSync('components/AdminDashboard.tsx', code);
