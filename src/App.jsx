import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchScreen from './components/SearchScreen';
import ViewerScreen from './components/ViewerScreen';
import TourScreen from './components/TourScreen';
import { geocodeLocation, fetchWikipediaSummary, generateNarration } from './services/api';
import { GUIDED_TOURS } from './constants';

function App() {
  const [currentView, setCurrentView] = useState('search');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [activeTour, setActiveTour] = useState(null);
  const [currentStop, setCurrentStop] = useState(0);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    
    // Check if this is a tour request
    if (query.startsWith('tour:')) {
      const tourId = query.replace('tour:', '');
      const tour = GUIDED_TOURS.find(t => t.id === tourId);
      if (tour) {
        setActiveTour(tour);
        setCurrentStop(0);
        setCurrentView('tour');
        setIsLoading(false);
        // Load first stop
        await loadTourStop(tour, 0);
        return;
      }
    }
    
    try {
      // 1. Wikipedia Summary (fetch first to get accurate coordinates)
      const wiki = await fetchWikipediaSummary(query);
      if (!wiki) {
        setError("We couldn't find that location. Please try a different name.");
        setIsLoading(false);
        return;
      }

      // 2. Use Wikipedia coordinates if available, otherwise geocode
      let lat, lng, name;
      if (wiki.lat && wiki.lng) {
        // Wikipedia has coordinates - use them (more accurate for historic sites)
        lat = wiki.lat;
        lng = wiki.lng;
        name = wiki.title;
        console.log('Using Wikipedia coordinates for accuracy');
      } else {
        // Fallback to geocoding if Wikipedia doesn't have coordinates
        const geo = await geocodeLocation(query);
        if (!geo) {
          setError("We found information but couldn't locate it on the map.");
          setIsLoading(false);
          return;
        }
        lat = geo.lat;
        lng = geo.lng;
        name = geo.name;
        console.log('Using geocoding as fallback');
      }

      // 3. AI Narration from n8n
      const narrationData = await generateNarration(name, wiki.extract, wiki.title);

      // 4. Set State
      setLocationData({
        name,
        lat,
        lng,
        narration: narrationData.narration,
        audioContent: narrationData.audioContent,
        historicalContext: wiki
      });
      setCurrentView('viewer');
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTourStop = async (tour, stopIndex) => {
    if (stopIndex < 0 || stopIndex >= tour.stops.length) return;
    
    setIsLoading(true);
    setCurrentStop(stopIndex);
    
    try {
      const stop = tour.stops[stopIndex];
      await handleSearch(stop.query);
    } catch (err) {
      console.error('Tour stop load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTourStopSelect = async (stopIndex) => {
    if (!activeTour) return;
    await loadTourStop(activeTour, stopIndex);
  };

  const resetToSearch = () => {
    setCurrentView('search');
    setError(null);
    setLocationData(null);
    setActiveTour(null);
    setCurrentStop(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header 
        showBack={currentView === 'viewer' || currentView === 'tour'} 
        onBack={resetToSearch} 
      />
      
      <main className="flex-1">
        {error && (
          <div className="max-w-2xl mx-auto px-4 mt-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {currentView === 'search' ? (
          <SearchScreen onSearch={handleSearch} isLoading={isLoading} />
        ) : currentView === 'tour' && activeTour ? (
          <>
            <TourScreen 
              tour={activeTour}
              currentStop={currentStop}
              onStopSelect={handleTourStopSelect}
              onBack={resetToSearch}
            />
            {locationData && (
              <ViewerScreen 
                data={locationData} 
                onReset={resetToSearch} 
              />
            )}
          </>
        ) : (
          locationData && (
            <ViewerScreen 
              data={locationData} 
              onReset={resetToSearch} 
            />
          )
        )}
      </main>

      <footer className="py-8 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} PathFinder AI Explorer. Powered by Google Maps & AI.
      </footer>
    </div>
  );
}

export default App;
