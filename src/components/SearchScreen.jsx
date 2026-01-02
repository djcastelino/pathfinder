import { useState } from 'react';
import { Search, MapPin, Sparkles, Info, Navigation } from 'lucide-react';
import { POPULAR_DESTINATIONS, GUIDED_TOURS } from '../constants';

export default function SearchScreen({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Search Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Search className="w-6 h-6 text-blue-600" />
          Search Historic Location
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Colosseum, Machu Picchu, Kyoto..."
              className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Finding History...
              </>
            ) : (
              'Explore Location'
            )}
          </button>
        </form>
      </div>

      {/* Guided Tours */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-purple-100 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-purple-600" />
          Guided Tours
        </h3>
        <p className="text-sm text-gray-600">Multi-stop immersive historical journeys</p>
        
        <div className="grid grid-cols-1 gap-4">
          {GUIDED_TOURS.map((tour) => (
            <button
              key={tour.id}
              onClick={() => onSearch(`tour:${tour.id}`)}
              disabled={isLoading}
              className="bg-white rounded-xl p-4 border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">{tour.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{tour.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{tour.description}</p>
                  <div className="flex items-center gap-3 text-xs text-purple-700">
                    <span className="bg-purple-100 px-2 py-1 rounded-full">{tour.duration}</span>
                    <span className="bg-blue-100 px-2 py-1 rounded-full">{tour.category}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Destinations by Category */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Popular Destinations
        </h3>
        
        {/* Sacred Paths */}
        <div>
          <h4 className="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
            ✝️ Sacred Paths
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {POPULAR_DESTINATIONS.filter(d => d.category === 'SACRED').map((dest) => (
              <button
                key={dest.name}
                onClick={() => onSearch(dest.query)}
                disabled={isLoading}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group"
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{dest.icon}</span>
                <span className="text-xs font-medium text-gray-700">{dest.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div>
          <h4 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
            🏛️ Architecture
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POPULAR_DESTINATIONS.filter(d => d.category === 'ARCHITECTURE').map((dest) => (
              <button
                key={dest.name}
                onClick={() => onSearch(dest.query)}
                disabled={isLoading}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{dest.icon}</span>
                <span className="text-xs font-medium text-gray-700">{dest.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Geographic Landmarks */}
        <div>
          <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
            🌍 Geographic Landmarks
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POPULAR_DESTINATIONS.filter(d => d.category === 'LANDMARKS').map((dest) => (
              <button
                key={dest.name}
                onClick={() => onSearch(dest.query)}
                disabled={isLoading}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-green-100 hover:border-green-300 hover:bg-green-50 transition-all group"
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{dest.icon}</span>
                <span className="text-xs font-medium text-gray-700">{dest.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Tip */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
        <Info className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-700 leading-relaxed">
          <strong>Tip:</strong> You can search for any historic landmark, archaeological site, or ancient wonder. Our AI guide will give you a private tour of the location!
        </p>
      </div>
    </div>
  );
}
