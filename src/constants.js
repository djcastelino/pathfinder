// Destination Categories
export const DESTINATION_CATEGORIES = {
  SACRED: 'Sacred Paths',
  ARCHITECTURE: 'Architecture',
  LANDMARKS: 'Geographic Landmarks'
};

// Tours Feature
export const GUIDED_TOURS = [
  {
    id: 'stations-of-the-cross',
    name: 'Stations of the Cross',
    icon: '✝️',
    description: 'Walk the path Jesus took to his crucifixion through 14 sacred stations',
    duration: '14 stops',
    category: 'Sacred',
    stops: [
      { name: 'First Station', query: 'Omariya School, Via Dolorosa, Jerusalem', description: 'Jesus is condemned to death' },
      { name: 'Second Station', query: 'Church of the Flagellation, Via Dolorosa, Jerusalem', description: 'Jesus takes up his cross' },
      { name: 'Third Station', query: 'Polish Catholic Chapel, Via Dolorosa, Jerusalem', description: 'Jesus falls for the first time' },
      { name: 'Fourth Station', query: 'Armenian Catholic Church, Via Dolorosa, Jerusalem', description: 'Jesus meets his mother Mary' },
      { name: 'Fifth Station', query: 'Franciscan Chapel, Via Dolorosa, Jerusalem', description: 'Simon of Cyrene helps Jesus carry the cross' },
      { name: 'Sixth Station', query: 'Little Sisters of Jesus, Via Dolorosa, Jerusalem', description: 'Veronica wipes the face of Jesus' },
      { name: 'Seventh Station', query: 'Franciscan Chapel VII, Via Dolorosa, Jerusalem', description: 'Jesus falls for the second time' },
      { name: 'Eighth Station', query: 'Greek Orthodox Monastery, Via Dolorosa, Jerusalem', description: 'Jesus meets the women of Jerusalem' },
      { name: 'Ninth Station', query: 'Coptic Patriarchate, Via Dolorosa, Jerusalem', description: 'Jesus falls for the third time' },
      { name: 'Tenth Station', query: 'Church of the Holy Sepulchre, Jerusalem', description: 'Jesus is stripped of his garments' },
      { name: 'Eleventh Station', query: 'Church of the Holy Sepulchre, Jerusalem', description: 'Jesus is nailed to the cross' },
      { name: 'Twelfth Station', query: 'Church of the Holy Sepulchre, Jerusalem', description: 'Jesus dies on the cross' },
      { name: 'Thirteenth Station', query: 'Church of the Holy Sepulchre, Jerusalem', description: 'Jesus is taken down from the cross' },
      { name: 'Fourteenth Station', query: 'Church of the Holy Sepulchre, Jerusalem', description: 'Jesus is laid in the tomb' }
    ]
  }
];

export const POPULAR_DESTINATIONS = [
  // Sacred Paths
  { name: 'Western Wall', icon: '🕍', query: 'Western Wall, Jerusalem', category: 'SACRED' },
  { name: 'Dome of the Rock', icon: '🕌', query: 'Dome of the Rock, Jerusalem', category: 'SACRED' },
  
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
