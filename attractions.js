/**
 * Attractions integration using Google Places API
 * Free tier: $200 credit per month (generous free usage!)
 * Get your API key at: https://console.cloud.google.com/
 */

// ⚠️ STUDENTS: Replace 'YOUR_API_KEY_HERE' with your actual Google API key
const GOOGLE_API_KEY = 'YOUR_API_KEY_HERE';

/**
 * Fetches attractions for a given city using Google Places API
 * @param {string} city - The city name to search for
 * @returns {Promise<Array>} Array of attraction objects
 */
export async function fetchAttractionsForCity(city) {
  // Check if student has configured their API key
  if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error(
      'Google API key not configured. Please:\n' +
      '1. Go to https://console.cloud.google.com/\n' +
      '2. Enable Places API\n' +
      '3. Create credentials (API key)\n' +
      '4. Replace YOUR_API_KEY_HERE in attractions.js'
    );
  }

  try {
    // Clean up city name - remove state/country codes
    const cleanCity = city.split(',')[0].trim();
    
    // Use Google Places Text Search API with CORS proxy
    const placesUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+${cleanCity}&key=${GOOGLE_API_KEY}&type=tourist_attraction&fields=name,rating,types,formatted_address,place_id`)}`;
    
    const placesResponse = await fetch(placesUrl);

    if (!placesResponse.ok) {
      throw new Error(`Places search failed: ${placesResponse.status}`);
    }

    const placesData = await placesResponse.json();

    if (placesData.status !== 'OK') {
      if (placesData.status === 'REQUEST_DENIED') {
        throw new Error('Invalid Google API key or Places API not enabled. Please check your configuration.');
      } else if (placesData.status === 'ZERO_RESULTS') {
        throw new Error(`No attractions found in ${city}. Try a different city!`);
      }
      throw new Error(`Google Places API error: ${placesData.status}`);
    }

    if (!placesData.results || placesData.results.length === 0) {
      throw new Error(`No attractions found in ${city}. Try a larger city!`);
    }

    // Transform Google Places data to our format and filter for local attractions
    const attractions = placesData.results
      .filter(place => {
        // Filter to only include attractions in the requested city
        const address = place.formatted_address || '';
        const cityName = cleanCity.toLowerCase();
        return address.toLowerCase().includes(cityName);
      })
      .slice(0, 8)
      .map(place => ({
        name: place.name,
        rating: place.rating ? place.rating.toFixed(1) : '4.0',
        type: place.types?.[0]?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Attraction',
        address: place.formatted_address || 'Address not available'
      }));

    return attractions;

  } catch (error) {
    console.error('Error fetching attractions:', error);
    
    // Provide helpful error messages
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to Google Places. Check your internet connection.');
    }
    throw error;
  }
}

/**
 * Renders attractions in the UI
 * @param {Array} items - Array of attraction objects
 */
export function renderAttractions(items) {
  const list = document.getElementById('attractions-list');
  
  if (!items || items.length === 0) {
    list.innerHTML = '<li style="color: var(--muted);">No attractions found. Try a different city!</li>';
    return;
  }
  
  list.innerHTML = items.map(i => `
    <li style="padding: 0.75rem; background: #f8fafc; border-radius: 8px; margin-bottom: 0.5rem; border: 1px solid #e5e7eb;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
        <strong style="color: var(--ink);">${i.name}</strong>
        <span style="color: var(--brand); font-weight: 500;">⭐ ${i.rating}</span>
      </div>
      <div style="color: var(--muted); font-size: 0.85rem;">
        ${i.type}
      </div>
      ${i.address ? `<div style="color: var(--muted); font-size: 0.75rem; margin-top: 0.25rem;">${i.address}</div>` : ''}
    </li>
  `).join('');
}