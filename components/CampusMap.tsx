import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { DEPARTMENTS } from '../constants';

// Fix Leaflet's default icon path issues with webpack/vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Since we don't have real coordinates for all departments, let's create a mockup coordinates for the campus.
// Voi Town hospital location approx: -3.393, 38.558 (Moi County Referral Hospital)
const hospitalCenter: [number, number] = [-3.394, 38.556];

const departmentLocations = DEPARTMENTS.map((dept, index) => {
  const angle = (index / DEPARTMENTS.length) * Math.PI * 2;
  const radius = 0.0005 + (Math.random() * 0.0003);
  const lat = hospitalCenter[0] + radius * Math.cos(angle);
  const lng = hospitalCenter[1] + radius * Math.sin(angle);
  
  return {
    ...dept,
    position: [lat, lng] as [number, number]
  };
});

const RecenterAutomatically = ({ lat, lng }: { lat: number, lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 18, { animate: true });
  }, [lat, lng, map]);
  return null;
}

const CampusMap: React.FC = () => {
  const [activeDept, setActiveDept] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(hospitalCenter);

  const handleDeptClick = (id: string, position: [number, number]) => {
    setActiveDept(id);
    setMapCenter(position);
  };

  return (
    <section id="campus-map" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Find Your Way</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Hospital Campus Map</h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
          {/* Department List */}
          <div className="w-full lg:w-1/3 flex flex-col h-[500px]">
            <h4 className="text-lg font-bold text-slate-900 mb-4 px-2">Departments & Facilities</h4>
            <div className="overflow-y-auto pr-2 space-y-2 custom-scrollbar flex-1">
              {departmentLocations.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => handleDeptClick(dept.id, dept.position)}
                  className={`w-full text-left p-4 rounded-xl transition-all border ${activeDept === dept.id ? 'border-teal-500 bg-white shadow-md' : 'border-slate-200 bg-white/50 hover:border-teal-200 hover:bg-white'}`}
                >
                  <div className="font-bold text-slate-800">{dept.name}</div>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-1">{dept.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-2/3 h-[500px] rounded-2xl overflow-hidden border border-slate-200 relative z-0">
            <MapContainer center={mapCenter} zoom={17} style={{ height: '100%', width: '100%' }} zoomControl={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RecenterAutomatically lat={mapCenter[0]} lng={mapCenter[1]} />
              
              {departmentLocations.map((dept) => (
                <Marker 
                  key={dept.id} 
                  position={dept.position}
                >
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-bold text-slate-900 mb-1">{dept.name}</h3>
                      <p className="text-sm text-slate-600 mb-2">{dept.description.substring(0, 60)}...</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </section>
  );
};

export default CampusMap;
