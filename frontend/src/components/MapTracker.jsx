import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapTracker() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 h-full min-h-[400px] flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-blue-400">🌍 Fleet Command Tracker</h2>
      <div className="flex-grow rounded-lg overflow-hidden border-2 border-gray-600">
        <MapContainer center={[28.6139, 77.2090]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[28.6139, 77.2090]}><Popup><strong>PRIOMED HQ LAB</strong></Popup></Marker>
        </MapContainer>
      </div>
    </div>
  );
}
