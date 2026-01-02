// Destination Categories
export const DESTINATION_CATEGORIES = {
  SACRED: 'Sacred Paths',
  ARCHITECTURE: 'Architecture',
  LANDMARKS: 'Geographic Landmarks'
};

export const POPULAR_DESTINATIONS = [
  // Sacred Paths
  { name: 'Via Dolorosa', icon: '✝️', query: 'Via Dolorosa', category: 'SACRED' },
  { name: 'Battle of Gettysburg', icon: '⚔️', query: 'Gettysburg National Military Park, Pennsylvania', category: 'SACRED' },
  { name: 'Western Wall', icon: '🕍', query: 'Western Wall, Jerusalem', category: 'SACRED' },
  
  // Architecture
  { name: 'Colosseum', icon: '🏛️', query: 'Colosseum, Rome, Italy', category: 'ARCHITECTURE' },
  { name: 'Taj Mahal', icon: '🕌', query: 'Taj Mahal, Agra, India', category: 'ARCHITECTURE' },
  { name: 'Eiffel Tower', icon: '🗼', query: 'Eiffel Tower, Paris, France', category: 'ARCHITECTURE' },
  { name: 'Big Ben', icon: '🕰️', query: 'Big Ben, London, United Kingdom', category: 'ARCHITECTURE' },
  
  // Geographic Landmarks
  { name: 'Giza Pyramids', icon: '🔺', query: 'Pyramids of Giza, Egypt', category: 'LANDMARKS' },
  { name: 'Machu Picchu', icon: '⛰️', query: 'Machu Picchu, Peru', category: 'LANDMARKS' },
  { name: 'Grand Canyon', icon: '🏜️', query: 'Grand Canyon South Rim, Arizona, USA', category: 'LANDMARKS' },
  { name: 'Great Wall', icon: '🧱', query: 'Great Wall of China, Badaling, China', category: 'LANDMARKS' }
];
