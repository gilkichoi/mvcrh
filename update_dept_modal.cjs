const fs = require('fs');

let code = fs.readFileSync('components/AdminDashboard.tsx', 'utf8');

const oldModalContent = `              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image URL</label>
                <input name="image" defaultValue={editingDept?.image} required className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
              </div>`;

const newModalContent = `              <div>
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
              </div>`;

code = code.replace(oldModalContent, newModalContent);

fs.writeFileSync('components/AdminDashboard.tsx', code);
