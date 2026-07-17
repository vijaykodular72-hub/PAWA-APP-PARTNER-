import React, { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Loader2, Store, MapPin, Phone, Globe } from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface Shop {
  id: string;
  name: string;
  owner: string;
  mobile: string;
  area: string;
  district: string;
  verificationStatus: string;
}

interface ShopWithCoords extends Shop {
  position?: google.maps.LatLngLiteral;
}

function GeocodeShops({ shops, onShopsGeocoded }: { shops: Shop[], onShopsGeocoded: (shops: ShopWithCoords[]) => void }) {
  const geocodingLib = useMapsLibrary('geocoding');
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (!geocodingLib || processed || shops.length === 0) return;

    const geocode = async () => {
      const geocoder = new geocodingLib.Geocoder();
      const results: ShopWithCoords[] = [];

      for (const shop of shops) {
        const address = `${shop.area}, ${shop.district}, India`;
        try {
          const response = await geocoder.geocode({ address });
          if (response.results[0]) {
            const location = response.results[0].geometry.location;
            results.push({
              ...shop,
              position: { lat: location.lat(), lng: location.lng() }
            });
          }
        } catch (error) {
          console.warn(`Geocoding failed for ${shop.name}:`, error);
          results.push(shop);
        }
      }
      onShopsGeocoded(results);
      setProcessed(true);
    };

    geocode();
  }, [geocodingLib, shops, processed, onShopsGeocoded]);

  return null;
}

function ShopMarkers({ shops }: { shops: ShopWithCoords[] }) {
  const [selectedShop, setSelectedShop] = useState<ShopWithCoords | null>(null);

  return (
    <>
      {shops.map(shop => shop.position && (
        <AdvancedMarker
          key={shop.id}
          position={shop.position}
          onClick={() => setSelectedShop(shop)}
        >
          <Pin 
            background={shop.verificationStatus === 'Verified' ? '#10b981' : '#4f46e5'} 
            glyphColor="#fff" 
            borderColor="#fff"
          />
        </AdvancedMarker>
      ))}

      {selectedShop && selectedShop.position && (
        <InfoWindow
          position={selectedShop.position}
          onCloseClick={() => setSelectedShop(null)}
        >
          <div className="p-1 min-w-[200px]">
            <h4 className="font-bold text-slate-900 mb-1">{selectedShop.name}</h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{selectedShop.area}, {selectedShop.district}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>{selectedShop.mobile}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  selectedShop.verificationStatus === 'Verified' 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'bg-amber-50 text-amber-600'
                }`}>
                  {selectedShop.verificationStatus}
                </span>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function ShopMap({ shops }: { shops: Shop[] }) {
  const [geocodedShops, setGeocodedShops] = useState<ShopWithCoords[]>([]);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Fallback to a default center (e.g., India center)
          setUserLocation({ lat: 20.5937, lng: 78.9629 });
        }
      );
    } else {
      setUserLocation({ lat: 20.5937, lng: 78.9629 });
    }
  }, []);

  if (!hasValidKey) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Google Maps Key Required</h2>
          <p className="text-sm text-slate-500 mb-6">To view shop locations on a map, please add your Google Maps API key to the project secrets.</p>
          <div className="text-left space-y-4">
            <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Setup Instructions:</p>
            <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
              <li>Get an API key from Google Cloud Console</li>
              <li>Open <strong>Settings</strong> (gear icon) in AI Studio</li>
              <li>Add secret <code>GOOGLE_MAPS_PLATFORM_KEY</code></li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[600px]">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={userLocation || { lat: 20.5937, lng: 78.9629 }}
          defaultZoom={5}
          mapId="SHOP_LOCATIONS_MAP"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          <GeocodeShops shops={shops} onShopsGeocoded={setGeocodedShops} />
          <ShopMarkers shops={geocodedShops} />
        </Map>
      </APIProvider>
    </div>
  );
}

// Simple AlertCircle component since it wasn't imported
function AlertCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
