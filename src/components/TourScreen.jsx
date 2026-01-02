import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

export default function TourScreen({ tour, currentStop, onStopSelect, onBack }) {
  const progress = ((currentStop + 1) / tour.stops.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </button>
        
        <div className="flex items-start gap-4 mb-4">
          <span className="text-4xl">{tour.icon}</span>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{tour.name}</h1>
            <p className="text-gray-600 mb-3">{tour.description}</p>
            <div className="flex items-center gap-3 text-sm">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                {tour.duration}
              </span>
              <span className="text-gray-500">
                Stop {currentStop + 1} of {tour.stops.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-purple-600 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tour Stops Grid */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tour Stops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tour.stops.map((stop, index) => (
            <button
              key={index}
              onClick={() => onStopSelect(index)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                index === currentStop
                  ? 'border-purple-500 bg-purple-50'
                  : index < currentStop
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === currentStop
                    ? 'bg-purple-600 text-white'
                    : index < currentStop
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{stop.name}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{stop.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onStopSelect(currentStop - 1)}
          disabled={currentStop === 0}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="font-semibold">{tour.stops[currentStop].name}</span>
        </div>

        <button
          onClick={() => onStopSelect(currentStop + 1)}
          disabled={currentStop === tour.stops.length - 1}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
