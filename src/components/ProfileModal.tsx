import React, { useState, useMemo, useEffect } from 'react';
import { User, X, Check, MapPin, Search } from 'lucide-react';
import { AVATAR_OPTIONS, getAvatarById } from '../utils/avatars';
import {
  INDIA_STATES_AND_UTS,
  findStateByCityOrName,
  TOTAL_CITIES_COUNT,
} from '../utils/indiaGeography';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentCompany: string;
  currentAvatar: string;
  currentCity: string;
  onSaveProfile: (data: { name: string; company: string; avatar: string; city: string }) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentName,
  currentCompany,
  currentAvatar,
  currentCity,
  onSaveProfile,
}) => {
  const [name, setName] = useState(currentName);
  const [company, setCompany] = useState(currentCompany);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const matchedState = useMemo(() => findStateByCityOrName(currentCity || 'Mumbai'), [currentCity]);
  const [selectedStateId, setSelectedStateId] = useState(matchedState.id);
  const [city, setCity] = useState(() => {
    const rawCity = (currentCity || 'Mumbai').split(',')[0].trim();
    return matchedState.cities.includes(rawCity) ? rawCity : matchedState.cities[0];
  });
  const [citySearch, setCitySearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(currentName);
      setCompany(currentCompany);
      setSelectedAvatar(currentAvatar);
      const st = findStateByCityOrName(currentCity || 'Mumbai');
      setSelectedStateId(st.id);
      const rawCity = (currentCity || 'Mumbai').split(',')[0].trim();
      setCity(st.cities.includes(rawCity) ? rawCity : st.cities[0]);
      setCitySearch('');
    }
  }, [isOpen, currentName, currentCompany, currentAvatar, currentCity]);

  const selectedStateObj = useMemo(
    () => INDIA_STATES_AND_UTS.find((s) => s.id === selectedStateId) || INDIA_STATES_AND_UTS[0],
    [selectedStateId]
  );

  const searchResults = useMemo(() => {
    const q = citySearch.trim().toLowerCase();
    if (!q) return [];
    const results: { city: string; stateId: string; stateName: string; hindiState: string }[] = [];
    for (const st of INDIA_STATES_AND_UTS) {
      const stateMatch =
        st.name.toLowerCase().includes(q) || st.hindiName.toLowerCase().includes(q);
      for (const c of st.cities) {
        if (stateMatch || c.toLowerCase().includes(q)) {
          results.push({
            city: c,
            stateId: st.id,
            stateName: st.name,
            hindiState: st.hindiName,
          });
        }
      }
    }
    return results.slice(0, 25);
  }, [citySearch]);

  if (!isOpen) return null;

  const handleStateChange = (stateId: string) => {
    setSelectedStateId(stateId);
    const st = INDIA_STATES_AND_UTS.find((s) => s.id === stateId);
    if (st && st.cities.length > 0) {
      setCity(st.cities[0]);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const finalLocation = `${city.trim() || selectedStateObj.capital}, ${selectedStateObj.name}`;
    onSaveProfile({
      name: name.trim(),
      company: company.trim() || `${name.trim()} Industries`,
      avatar: selectedAvatar,
      city: finalLocation,
    });
    onClose();
  };

  const activeAvatarObj = getAvatarById(selectedAvatar);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Player Profile & All-India HQ Selector
              </h2>
              <p className="text-xs text-slate-400">Apna naam, avatar, rajya aur shahar chunein</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Preview */}
        <div className="mt-4 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeAvatarObj.gradient} border ${activeAvatarObj.border} flex items-center justify-center text-3xl shadow-lg shrink-0`}>
            {activeAvatarObj.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white truncate">{name || 'Your Name'}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-1.5 py-0.5 rounded font-bold">FOUNDER & CEO</span>
            </div>
            <div className="text-xs text-slate-400 truncate mt-0.5">{company || 'Your Enterprise'}</div>
            <div className="text-[11px] text-amber-400 font-medium mt-0.5">
              📍 {city}, {selectedStateObj.name}
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="mt-4 space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-300 block mb-1">
              Player Name (Apna Naam)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-sky-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">
              Enterprise / Company Name
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Sharma Heavy Industries"
              className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-sky-400 focus:outline-none"
            />
          </div>

          {/* All 28 States + 8 UTs & Cities Picker */}
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Headquarters (All 28 States & 8 UTs)</span>
              </label>
              <span className="text-[10px] font-mono text-sky-400">{TOTAL_CITIES_COUNT}+ Cities</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Search any city or state across India..."
                className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs focus:ring-1 focus:ring-sky-400 focus:outline-none"
              />
            </div>

            {searchResults.length > 0 && (
              <div className="max-h-28 overflow-y-auto bg-slate-900 border border-sky-500/40 rounded-lg p-1 space-y-1">
                {searchResults.map((res, idx) => (
                  <button
                    key={`${res.stateId}-${res.city}-${idx}`}
                    type="button"
                    onClick={() => {
                      setSelectedStateId(res.stateId);
                      setCity(res.city);
                      setCitySearch('');
                    }}
                    className="w-full text-left px-2 py-1 rounded hover:bg-sky-500/20 flex items-center justify-between text-xs text-slate-200"
                  >
                    <span className="font-bold">{res.city}</span>
                    <span className="text-[10px] text-sky-300 font-mono">{res.stateName}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={selectedStateId}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-lg p-2 text-xs focus:ring-1 focus:ring-sky-400 focus:outline-none"
              >
                <optgroup label="28 States">
                  {INDIA_STATES_AND_UTS.filter((s) => s.type === 'State').map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.hindiName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="8 Union Territories">
                  {INDIA_STATES_AND_UTS.filter((s) => s.type === 'Union Territory').map((ut) => (
                    <option key={ut.id} value={ut.id}>
                      {ut.name} ({ut.hindiName})
                    </option>
                  ))}
                </optgroup>
              </select>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-lg p-2 text-xs focus:ring-1 focus:ring-sky-400 focus:outline-none"
              >
                {selectedStateObj.cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Avatar Picker Grid */}
        <div className="mt-5">
          <label className="font-semibold text-xs text-slate-300 block mb-2 flex items-center justify-between">
            <span>Select Your Business Avatar ({AVATAR_OPTIONS.length} Options)</span>
            <span className="text-[11px] text-sky-400 font-normal">Choose Persona</span>
          </label>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {AVATAR_OPTIONS.map((av) => {
              const isSelected = selectedAvatar === av.id;
              return (
                <button
                  key={av.id}
                  onClick={() => setSelectedAvatar(av.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center relative ${
                    isSelected
                      ? `bg-slate-800 ${av.border} ring-2 ring-sky-400 shadow-md`
                      : 'bg-slate-950/70 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                  <span className="text-2xl mb-1">{av.emoji}</span>
                  <span className="text-xs font-bold text-slate-200 line-clamp-1">{av.name}</span>
                  <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{av.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-950 transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
};
