import React, { useState, useEffect } from 'react';
import MapTracker from './components/MapTracker';

export default function App() {
  const [queue, setQueue] = useState([]);
  const [form, setForm] = useState({ patient_name: '', sample_type: 'Blood', transit_time_mins: 30, is_emergency: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/live-queue");
    ws.onmessage = (e) => setQueue(JSON.parse(e.data));
    return () => ws.close();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/add-sample", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        alert("Sample injected successfully into PostgreSQL and AI Engine!");
        setForm({ ...form, patient_name: '', transit_time_mins: 30, is_emergency: false });
      }
    } catch (err) {
      alert("Error adding sample. Is backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
        PRIOMED AI
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Live AI Queue directly from PostgreSQL */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 h-[500px] flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-emerald-400">⚡ Live Production Queue</h2>
          <div className="overflow-y-auto space-y-2 flex-grow">
            {queue.length === 0 ? <p className="text-gray-500 text-sm mt-10 text-center">Database is empty. Add a sample!</p> : null}
            {queue.map((s, i) => (
              <div key={s.id} className={`p-3 rounded border ${i === 0 && s.risk > 70 ? 'bg-red-900 border-red-500 animate-pulse' : 'bg-gray-900 border-gray-700'}`}>
                <div className="flex justify-between">
                  <strong className="text-sm">{s.id} - {s.patient}</strong>
                  <span className="text-yellow-400 font-bold text-sm">{s.risk?.toFixed(0)} pts</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{s.type} {s.emergency ? ' | 🚨 URGENT' : ''}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Live Map */}
        <div className="h-[500px]">
          <MapTracker />
        </div>

        {/* Right: Manual Data Entry */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 h-[500px]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">➕ Add Lab Sample</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-400">Patient Name</label>
              <input required className="w-full p-2 mt-1 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.patient_name} onChange={e => setForm({...form, patient_name: e.target.value})} />
            </div>
            <div>
              <label className="text-sm text-gray-400">Sample Type</label>
              <select className="w-full p-2 mt-1 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.sample_type} onChange={e => setForm({...form, sample_type: e.target.value})}>
                <option>Blood</option><option>Tissue</option><option>DNA</option><option>Urine</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400">Time Since Collection (Minutes)</label>
              <input type="number" className="w-full p-2 mt-1 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.transit_time_mins} onChange={e => setForm({...form, transit_time_mins: Number(e.target.value)})} />
            </div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded bg-gray-700" checked={form.is_emergency} onChange={e => setForm({...form, is_emergency: e.target.checked})} />
              <span className="text-sm text-gray-200">Critical / Emergency Condition</span>
            </label>
            <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 p-3 rounded font-bold mt-2 transition-colors disabled:bg-gray-600">
              {loading ? "Processing..." : "Process in AI Engine"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
