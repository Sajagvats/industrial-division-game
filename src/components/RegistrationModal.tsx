import React, { useState, useMemo } from 'react';
import { Building2, User, MapPin, Sparkles, ArrowRight, Search } from 'lucide-react';
import { AVATAR_OPTIONS, getAvatarById } from '../utils/avatars';
import { INDIA_STATES_AND_UTS, TOTAL_CITIES_COUNT } from '../utils/indiaGeography';

interface RegistrationModalProps {
  isOpen: boolean;
  onRegister: (data: { name: string; company: string; avatar: string; city: string }) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onRegister,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('mandi_king');
  const [selectedStateId, setSelectedStateId] = useState('MH');
  const [city, setCity] = useState('Mumbai');
  const [citySearch, setCitySearch] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedStateObj = useMemo(
    () => INDIA_STATES_AND_UTS.find((s) => s.id === selectedStateId) || INDIA_STATES_AND_UTS[0],
    [selectedStateId]
  );

  // Pan-India city search results when user types in search box
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Kripya apna naam likhein (Enter your name)');
      return;
    }
    if (!company.trim()) {
      setErrorMsg('Kripya apni company ka naam likhein (Enter your company name)');
      return;
    }

    const finalLocation = `${city.trim() || selectedStateObj.capital}, ${selectedStateObj.name}`;
    onRegister({
      name: name.trim(),
      company: company.trim(),
      avatar: selectedAvatar,
      city: finalLocation,
    });
  };

  const activeAvatarObj = getAvatarById(selectedAvatar);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#1c0d06] border border-orange-700/80 rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[94vh] overflow-y-auto text-slate-100">
        
        {/* Header Lockup */}
        <div className="text-center pb-4 border-b border-orange-900/60">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 p-0.5 flex items-center justify-center shadow-lg shadow-orange-950/60 mb-3">
            <div className="w-full h-full bg-[#1c0d06] rounded-[14px] flex items-center justify-center text-2xl">
              🏢
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase bg-orange-500/20 text-orange-300 font-bold px-2.5 py-0.5 rounded-full border border-orange-500/40">
            39-Player Championship · All 28 States & 8 UTs
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight">
            Apni Company Register Karein
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            Apna naam, company aur desh ke kisi bhi rajya va shahar ko chunein!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          
          {/* Player Name */}
          <div>
            <label className="font-bold text-slate-200 block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-orange-400" />
              <span>Aapka Naam (Player Name) *</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Jaise: Rahul Sharma, Amit, Priya..."
              className="w-full bg-[#120602] text-white placeholder-slate-500 border border-orange-900/70 rounded-xl p-3 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="font-bold text-slate-200 block mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Company Ka Naam (Company Name) *</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Jaise: Bharat Heavy Industries, Apex Metals, Verma Steel..."
              className="w-full bg-[#120602] text-white placeholder-slate-500 border border-orange-900/70 rounded-xl p-3 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
            />
          </div>

          {/* Avatar Selector */}
          <div>
            <label className="font-bold text-slate-200 block mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Apna Business Avatar Chunein:</span>
              </span>
              <span className="text-[11px] text-amber-300 font-mono font-medium">
                {activeAvatarObj.title}
              </span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVATAR_OPTIONS.map((av) => {
                const isSelected = selectedAvatar === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatar(av.id)}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-orange-500/20 border-orange-400 ring-2 ring-orange-500/50 shadow-md'
                        : 'bg-[#120602] border-orange-950 hover:border-orange-800'
                    }`}
                  >
                    <span className="text-2xl">{av.emoji}</span>
                    <span className="text-[10px] font-bold text-slate-300 truncate w-full text-center">
                      {av.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* All-India State & City Selector (28 States + 8 UTs, 500+ Cities) */}
          <div className="p-3.5 rounded-2xl bg-[#120602] border border-orange-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Bharat ke Sabhi Rajya aur Shahar (HQ Location)</span>
              </label>
              <span className="text-[10px] font-mono text-amber-400">
                36 States/UTs · {TOTAL_CITIES_COUNT}+ Cities
              </span>
            </div>

            {/* Quick Pan-India City Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Koi bhi shahar ya rajya search karein (jaise: Patna, Indore, Leh, Surat)..."
                className="w-full bg-[#1c0d06] text-white placeholder-slate-500 border border-orange-900/60 rounded-xl pl-8 pr-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Search Dropdown Results */}
            {searchResults.length > 0 && (
              <div className="max-h-32 overflow-y-auto bg-[#1a0a04] border border-amber-500/40 rounded-xl p-1.5 space-y-1">
                {searchResults.map((res, idx) => (
                  <button
                    key={`${res.stateId}-${res.city}-${idx}`}
                    type="button"
                    onClick={() => {
                      setSelectedStateId(res.stateId);
                      setCity(res.city);
                      setCitySearch('');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-orange-500/20 flex items-center justify-between text-xs text-slate-200"
                  >
                    <span className="font-bold">{res.city}</span>
                    <span className="text-[10px] text-amber-300 font-mono">
                      {res.stateName} ({res.hindiState})
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* 2-Column State + City Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">
                  1. Rajya / Union Territory (State)
                </span>
                <select
                  value={selectedStateId}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full bg-[#1c0d06] text-white border border-orange-900/70 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <optgroup label="28 States (भारत के सभी 28 राज्य)">
                    {INDIA_STATES_AND_UTS.filter((s) => s.type === 'State').map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.hindiName})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="8 Union Territories (केंद्र शासित प्रदेश)">
                    {INDIA_STATES_AND_UTS.filter((s) => s.type === 'Union Territory').map((ut) => (
                      <option key={ut.id} value={ut.id}>
                        {ut.name} ({ut.hindiName})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">
                  2. Shahar / Zila ({selectedStateObj.cities.length} Cities)
                </span>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#1c0d06] text-white border border-orange-900/70 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {selectedStateObj.cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-[11px] text-amber-300/90 bg-[#1c0d06] px-2.5 py-1.5 rounded-lg border border-orange-950 flex flex-wrap items-center justify-between gap-2">
              <span>🏭 <b>{selectedStateObj.name}:</b> {selectedStateObj.economicSpecialty}</span>
              <span className="font-mono text-emerald-400 font-bold">{selectedStateObj.demandBonusLabel}</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-2.5 bg-rose-950/60 border border-rose-500/50 rounded-xl text-rose-300 text-xs font-semibold text-center">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-xl shadow-orange-950/60 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
          >
            <span>Company Register Karein & Khel Shuru Karein</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-400 text-center">
            Tournament me 39 Enterprises compete kar rahi hain. Har saal bottom 3 players eliminate honge!
          </p>

        </form>

      </div>
    </div>
  );
};
