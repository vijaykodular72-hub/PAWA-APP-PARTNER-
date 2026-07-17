import React, { useState, useEffect, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { 
  Target, 
  MapPin, 
  TrendingUp, 
  Phone, 
  PlusCircle, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Navigation,
  Compass,
  DollarSign,
  Briefcase,
  Store,
  Clock,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { calculateDistance, formatDistance } from '../utils/distance';
import { useNotifications } from './NotificationProvider';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export interface TargetSalon {
  id: string;
  name: string;
  owner: string;
  mobile: string;
  area: string;
  district: string;
  lat: number;
  lng: number;
  estRevenue: number; // monthly revenue in INR
  status: 'High Value' | 'Interested' | 'Cold' | 'Contacted' | 'Demo Scheduled';
  tier: 'Gold' | 'Silver' | 'Platinum';
}

const targetSalons: TargetSalon[] = [
  {
    id: 'tgt-1',
    name: 'Glitz & Glamour Luxury Salon',
    owner: 'Rohan Deshmukh',
    mobile: '+91 9123456789',
    area: 'Kothrud',
    district: 'Pune, MH',
    lat: 18.5074,
    lng: 73.8077,
    estRevenue: 250000,
    status: 'High Value',
    tier: 'Platinum'
  },
  {
    id: 'tgt-2',
    name: 'The Crown Unisex Lounge',
    owner: 'Sneha Kulkarni',
    mobile: '+91 9876543210',
    area: 'Viman Nagar',
    district: 'Pune, MH',
    lat: 18.5679,
    lng: 73.9143,
    estRevenue: 180000,
    status: 'Interested',
    tier: 'Gold'
  },
  {
    id: 'tgt-3',
    name: 'Jawed Habib Hair Studio',
    owner: 'Vijay Shinde',
    mobile: '+91 8888899999',
    area: 'Baner',
    district: 'Pune, MH',
    lat: 18.5590,
    lng: 73.7868,
    estRevenue: 320000,
    status: 'Demo Scheduled',
    tier: 'Platinum'
  },
  {
    id: 'tgt-4',
    name: 'Mirror Mirror Magic',
    owner: 'Priyanka Patil',
    mobile: '+91 7777766666',
    area: 'Aundh',
    district: 'Pune, MH',
    lat: 18.5602,
    lng: 73.8031,
    estRevenue: 120000,
    status: 'Cold',
    tier: 'Silver'
  },
  {
    id: 'tgt-5',
    name: 'The Grooming Room',
    owner: 'Aniket Joshi',
    mobile: '+91 9555512345',
    area: 'Kalyani Nagar',
    district: 'Pune, MH',
    lat: 18.5463,
    lng: 73.9033,
    estRevenue: 210000,
    status: 'Contacted',
    tier: 'Gold'
  },
  {
    id: 'tgt-6',
    name: 'Urban Oasis Unisex Spa',
    owner: 'Meera Nair',
    mobile: '+91 9666622222',
    area: 'Hinjewadi',
    district: 'Pune, MH',
    lat: 18.5913,
    lng: 73.7389,
    estRevenue: 150000,
    status: 'Interested',
    tier: 'Gold'
  }
];

interface TargetOpportunitiesMapProps {
  coords: { latitude: number; longitude: number } | null;
  onAddAsLead?: (salon: TargetSalon) => void;
}

export default function TargetOpportunitiesMap({ coords, onAddAsLead }: TargetOpportunitiesMapProps) {
  const { addNotification } = useNotifications();
  const [selectedSalon, setSelectedSalon] = useState<TargetSalon | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'distance' | 'revenue'>('revenue');
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: 18.55, lng: 73.84 });

  // Fallback map simulation status
  const [isDemoModOpen, setIsDemoModOpen] = useState(false);

  // Set initial map center closer to user if available
  useEffect(() => {
    if (coords) {
      setMapCenter({ lat: coords.latitude, lng: coords.longitude });
    } else {
      // Default center around Pune city center
      setMapCenter({ lat: 18.5204, lng: 73.8567 });
    }
  }, [coords]);

  // Compute distance for salons
  const processedSalons = useMemo(() => {
    return targetSalons.map(salon => {
      let distanceValue = 999;
      if (coords) {
        distanceValue = calculateDistance(coords.latitude, coords.longitude, salon.lat, salon.lng);
      }
      // Estimated Monthly Commission for GP is 10% operating fee share of platform revenue
      // (approx 1% of salon revenue goes to GP, i.e. 10% of Nexora's 10% share)
      const estGPCommission = Math.round(salon.estRevenue * 0.015); // 1.5% referral yield 
      return {
        ...salon,
        distanceValue,
        estGPCommission
      };
    });
  }, [coords]);

  // Filter & Sort
  const filteredSalons = useMemo(() => {
    let result = processedSalons.filter(salon => {
      if (filterStatus === 'All') return true;
      if (filterStatus === 'High Value') return salon.status === 'High Value' || salon.estRevenue >= 200000;
      return salon.status === filterStatus;
    });

    if (sortBy === 'distance') {
      result.sort((a, b) => a.distanceValue - b.distanceValue);
    } else {
      result.sort((a, b) => b.estRevenue - a.estRevenue);
    }

    return result;
  }, [processedSalons, filterStatus, sortBy]);

  const handleStartLead = (salon: TargetSalon) => {
    if (onAddAsLead) {
      onAddAsLead(salon);
    }
    addNotification(
      'Target Added! 🎯',
      `"${salon.name}" has been registered as an active lead in your pipeline.`,
      'success'
    );
  };

  const panToSalon = (salon: TargetSalon) => {
    setSelectedSalon(salon);
    setMapCenter({ lat: salon.lat, lng: salon.lng });
    addNotification('Panning Map 🧭', `Centered map on ${salon.name} in ${salon.area}.`, 'info');
  };

  if (!hasValidKey) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8" id="target-salon-geo">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Instructions Column */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                <Target className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                <span>Pune District Hotspots View</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-indigo-950 tracking-tight">
                Nearby Target Salons & Leads Map
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Maximize your fuel efficiency. Visualize top high-revenue target salons in your assigned territory, check distances, and optimize your visit schedule.
              </p>
            </div>

            {/* Simulated Interactive Listing to make it useful even without API Key */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Territory Prospects ({filteredSalons.length})
                </h3>
                <div className="flex gap-2">
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-[11px] font-bold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 outline-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="High Value">🔥 Premium Target</option>
                    <option value="Interested">Interested</option>
                    <option value="Demo Scheduled">Demo Scheduled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {filteredSalons.map(salon => (
                  <div 
                    key={salon.id}
                    onClick={() => setSelectedSalon(salon)}
                    className={cn(
                      "p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between hover:bg-slate-100/70 transition-all cursor-pointer relative overflow-hidden group",
                      selectedSalon?.id === salon.id ? "border-indigo-200 bg-indigo-50/30 ring-2 ring-indigo-50" : ""
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{salon.name}</p>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[8px] font-black uppercase",
                          salon.status === 'High Value' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                          salon.status === 'Interested' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                          "bg-indigo-50 text-indigo-600 border border-indigo-100"
                        )}>
                          {salon.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {salon.area}, {salon.district}
                        {coords && salon.distanceValue !== 999 && (
                          <span className="text-indigo-600 font-bold ml-1">({formatDistance(salon.distanceValue)})</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold">EST. COMMISSION</p>
                      <p className="text-xs font-black text-emerald-600">₹{salon.estGPCommission.toLocaleString()}/mo</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4.5 text-xs text-amber-800">
              <h4 className="font-bold flex items-center gap-1.5 mb-1 text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Google Maps Key Required for Live Visual Navigation
              </h4>
              <p className="leading-relaxed">
                Provide your <strong>GOOGLE_MAPS_PLATFORM_KEY</strong> in the AI Studio secrets pane to enable the fully responsive interactive map layer with custom pins, geo-boundaries, and driving route projections.
              </p>
              <div className="mt-3 flex gap-3">
                <a 
                  href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" 
                  target="_blank" 
                  rel="noopener"
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors inline-block"
                >
                  Get API Key ↗
                </a>
                <button
                  type="button"
                  onClick={() => setIsDemoModOpen(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                >
                  How to setup key?
                </button>
              </div>
            </div>

          </div>

          {/* Fallback Beautiful Map Graphics / Interactive Sandbox */}
          <div className="flex-1 h-[450px] bg-slate-950 rounded-2xl relative overflow-hidden flex flex-col justify-between p-6 border border-slate-800 shadow-xl group">
            {/* Glowing Tech Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-indigo-500/10 to-transparent pointer-events-none" />
            <div className="absolute -right-1/4 -bottom-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Virtual Pune Territory Arena</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 text-slate-400 rounded-lg p-1 px-2.5 text-[10px] font-bold">
                Assigned District: Pune Central
              </div>
            </div>

            {/* Center Map Graphics Representation */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto my-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-900/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                <Compass className="w-8 h-8 animate-spin-slow" style={{ animationDuration: '12s' }} />
              </div>
              <div>
                <p className="text-white font-black text-sm">Interactive Geo-Location Overlay</p>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Geocodes salon positions on-the-fly and overlays critical performance estimates. Enter key to activate map view.
                </p>
              </div>
            </div>

            {/* Mini Panel details if selected */}
            <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between backdrop-blur">
              {selectedSalon ? (
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-white font-black text-xs">{selectedSalon.name}</p>
                    <p className="text-[10px] text-slate-500 font-semibold">{selectedSalon.owner} ({selectedSalon.area})</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleStartLead(selectedSalon)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-1.5 px-3 text-[10px] font-black cursor-pointer transition-all flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Onboard Salon
                  </button>
                </div>
              ) : (
                <p className="text-[10px] text-slate-500 font-semibold text-center w-full">
                  💡 Select any territory prospect on the left to inspect value.
                </p>
              )}
            </div>

          </div>

        </div>

        {/* Demo Mod Setup Modal */}
        {isDemoModOpen && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md p-6 shadow-2xl relative">
              <button 
                onClick={() => setIsDemoModOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-base font-black text-slate-900 mb-2">Google Maps Key Integration Setup</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Follow these simple steps to integrate your Google Maps API key into AI Studio:
              </p>
              <ol className="text-xs text-slate-600 space-y-3 list-decimal list-inside font-semibold bg-slate-50 p-4 rounded-xl mb-4">
                <li>
                  Go to <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noopener" className="text-indigo-600 underline">Google Cloud Console</a> and create a project with Maps JavaScript API enabled.
                </li>
                <li>
                  Generate an API key and restrict it if needed (optional).
                </li>
                <li>
                  In AI Studio, click the <strong className="text-indigo-950">Settings (⚙️ gear icon)</strong> at the top right corner.
                </li>
                <li>
                  Select <strong className="text-indigo-950">Secrets</strong>, add a secret named <code className="bg-slate-200 px-1.5 py-0.5 rounded text-indigo-700">GOOGLE_MAPS_PLATFORM_KEY</code>, paste your key, and save.
                </li>
                <li>
                  The application will rebuild automatically and activate full interactive mapping!
                </li>
              </ol>
              <button
                onClick={() => setIsDemoModOpen(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-xs font-black cursor-pointer"
              >
                Understood, Got It
              </button>
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6" id="target-salon-geo">
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <Target className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Assigned District: Pune Central</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Target Salon Opportunities Map
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Visualize prospective salon leads geographically to streamline field sales visits and maximize onboardings.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/55 text-xs">
            <button
              onClick={() => setSortBy('revenue')}
              className={cn(
                "px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all",
                sortBy === 'revenue' ? "bg-white text-indigo-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
              )}
            >
              Top Revenue
            </button>
            <button
              onClick={() => setSortBy('distance')}
              className={cn(
                "px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all",
                sortBy === 'distance' ? "bg-white text-indigo-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
              )}
            >
              Nearest First
            </button>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs font-bold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            <option value="All">All Leads</option>
            <option value="High Value">🔥 High Value Targets</option>
            <option value="Interested">Interested</option>
            <option value="Demo Scheduled">Demo Scheduled</option>
            <option value="Contacted">Contacted</option>
            <option value="Cold">Cold Leads</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Salon prospects listing column */}
        <div className="w-full lg:w-80 space-y-3 max-h-[450px] overflow-y-auto pr-1">
          {filteredSalons.length === 0 ? (
            <div className="p-8 border border-dashed border-slate-200 rounded-xl text-center">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-500">No Match Found</p>
              <p className="text-[10px] text-slate-400 mt-1">Try changing status filters.</p>
            </div>
          ) : (
            filteredSalons.map((salon) => {
              const isSelected = selectedSalon?.id === salon.id;
              return (
                <div
                  key={salon.id}
                  onClick={() => panToSalon(salon)}
                  className={cn(
                    "p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border transition-all cursor-pointer text-left group",
                    isSelected ? "border-indigo-500 bg-indigo-50/40 ring-1 ring-indigo-500/20" : "border-slate-200/60"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {salon.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {salon.area}
                      </p>
                    </div>
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[8px] font-black uppercase whitespace-nowrap",
                      salon.status === 'High Value' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                      salon.status === 'Interested' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {salon.status}
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold">
                    <div className="text-slate-400">
                      EST. COMMISSION: <span className="text-emerald-600">₹{salon.estGPCommission.toLocaleString()}</span>
                    </div>
                    {salon.distanceValue !== 999 && (
                      <span className="text-indigo-600 bg-white border border-indigo-100 rounded-lg px-1.5 py-0.5">
                        {formatDistance(salon.distanceValue)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Map Column */}
        <div className="flex-1 h-[450px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              center={mapCenter}
              zoom={13}
              mapId="TARGET_SALONS_OPPORTUNITIES_MAP"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
              gestureHandling="greedy"
              disableDefaultUI={false}
            >
              {filteredSalons.map((salon) => (
                <AdvancedMarker
                  key={salon.id}
                  position={{ lat: salon.lat, lng: salon.lng }}
                  onClick={() => setSelectedSalon(salon)}
                >
                  <Pin 
                    background={salon.status === 'High Value' ? '#f43f5e' : salon.status === 'Interested' ? '#10b981' : '#4f46e5'} 
                    glyphColor="#fff" 
                    borderColor="#fff"
                  />
                </AdvancedMarker>
              ))}

              {selectedSalon && (
                <InfoWindow
                  position={{ lat: selectedSalon.lat, lng: selectedSalon.lng }}
                  onCloseClick={() => setSelectedSalon(null)}
                >
                  <div className="p-2 min-w-[220px] text-left">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Store className="w-3.5 h-3.5 text-indigo-600" />
                      <h4 className="font-bold text-slate-900 text-xs">{selectedSalon.name}</h4>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-slate-600 font-semibold mt-2">
                      <p className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{selectedSalon.area}, {selectedSalon.district}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>Owner: {selectedSalon.owner}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{selectedSalon.mobile}</span>
                      </p>
                      <p className="flex items-center gap-1 text-emerald-600 font-bold">
                        <DollarSign className="w-3 h-3 text-emerald-500" />
                        <span>Est. Commission: ₹{Math.round(selectedSalon.estRevenue * 0.015).toLocaleString()}/mo</span>
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartLead(selectedSalon)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-1.5 text-[10px] font-black cursor-pointer transition-colors text-center flex items-center justify-center gap-1"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        Add as Lead
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>

      </div>
    </div>
  );
}

// Simple User component for the InfoWindow fallback
function User({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
