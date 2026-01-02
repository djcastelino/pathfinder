// PathFinder API Services

export const fetchWikipediaSummary = async (query) => {
  try {
    // Try exact match first
    let summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/ /g, '_'))}`
    );
    
    // If exact match fails, search with filters
    if (!summaryRes.ok) {
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
      );
      
      if (!searchRes.ok) {
        console.warn(`Wikipedia search failed: ${searchRes.status}`);
        return null;
      }
      
      const searchData = await searchRes.json();
      
      if (!searchData.query.search.length) return null;
      
      // Filter out disambiguation pages, court cases, and prefer actual places
      let pageTitle = searchData.query.search[0].title;
      for (const result of searchData.query.search) {
        const title = result.title.toLowerCase();
        const snippet = result.snippet.toLowerCase();
        
        // Skip court cases, legal articles, disambiguation pages
        if (title.includes('vs.') || title.includes('v.') || 
            title.includes('(disambiguation)') ||
            snippet.includes('court case') || 
            snippet.includes('litigation')) {
          continue;
        }
        
        // Prefer results that mention building, monument, temple, etc.
        if (snippet.includes('building') || snippet.includes('monument') || 
            snippet.includes('temple') || snippet.includes('palace') ||
            snippet.includes('located in') || snippet.includes('situated')) {
          pageTitle = result.title;
          break;
        }
      }
      
      console.log('Wikipedia found:', pageTitle);
      summaryRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`
      );
    }
    
    if (!summaryRes.ok) {
      console.warn(`Wikipedia summary failed: ${summaryRes.status} - Rate limited or not found`);
      return null;
    }
    
    const wikiData = await summaryRes.json();
    
    // Add coordinates if available from Wikipedia
    if (wikiData.coordinates) {
      wikiData.lat = wikiData.coordinates.lat;
      wikiData.lng = wikiData.coordinates.lon;
      console.log('Using Wikipedia coordinates:', wikiData.lat, wikiData.lng);
    } else {
      console.warn('No coordinates in Wikipedia data for:', pageTitle);
    }
    
    return wikiData;
  } catch (error) {
    console.error("Wikipedia fetch error:", error);
    return null;
  }
};

export const generateNarration = async (locationName, wikiContext, wikipediaPage) => {
  try {
    // Add variety with different narrative styles
    const styles = [
      "Create a vivid, immersive first-person tour guide narration",
      "Write an engaging historical storytelling narrative",
      "Provide a dramatic, cinematic description",
      "Share fascinating facts in an enthusiastic tour guide voice",
      "Tell the story as if transporting visitors back in time"
    ];
    
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    
    // Call your n8n webhook instead of Google Gemini
    const response = await fetch('https://workflowly.online/webhook/pathfinder-narration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pathId: 'user-search',
        locationId: locationName.toLowerCase().replace(/\s+/g, '-'),
        locationTitle: locationName,
        locationDescription: wikiContext.substring(0, 200),
        wikipediaPage: wikipediaPage || locationName.replace(/\s+/g, '_'),
        narrativeStyle: randomStyle,
        timestamp: Date.now() // Add timestamp to ensure uniqueness
      })
    });
    
    const data = await response.json();
    return data.narration || "Welcome to this historic site. Take a moment to soak in the incredible atmosphere and rich history surrounding you.";
  } catch (error) {
    console.error("Narration generation error:", error);
    return "Welcome to this historic site. Imagine the countless stories these ancient paths could tell as you explore one of the world's most significant landmarks.";
  }
};

export const geocodeLocation = async (query) => {
  try {
    // API key loaded via .env.local
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDLcDOKopyll9ByGplOcQ6sEUx3CYbLphU';
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
    );
    const data = await res.json();
    
    console.log('Geocoding response:', data); // Debug log
    
    if (data.status === 'OK') {
      const result = data.results[0];
      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        name: result.formatted_address
      };
    }
    
    console.error('Geocoding failed:', data.status, data.error_message);
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};
