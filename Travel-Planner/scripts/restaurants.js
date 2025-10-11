/**
 * Restaurant integration using Yelp Fusion API
 * Free tier: 500 requests per day
 * Get your API key at: https://www.yelp.com/developers/documentation/v3/authentication
 */

// ⚠️ STUDENTS: Replace 'your_key' with your actual Yelp API key
const YELP_API_KEY = 'your_key';

/**
 * Fetches restaurants for a given city using Yelp Fusion API
 * @param {string} city - The city name to search for
 * @returns {Promise<Array>} Array of restaurant objects
 */
export async function fetchRestaurantsForCity(city) {
  // Check if student has configured their API key
  if (!YELP_API_KEY || YELP_API_KEY === 'your_key') {
    throw new Error(
      'Yelp API key not configured. Please:\n' +
      '1. Go to https://www.yelp.com/developers/documentation/v3/authentication\n' +
      '2. Create an app and get your API key\n' +
      '3. Replace "your_key" in restaurants.js with your actual Yelp API key'
    );
  }

  try {
    // Clean up city name - remove state/country codes
    const cleanCity = city.split(',')[0].trim();
    
    // Use Yelp Fusion API with CORS proxy
    const yelpUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(cleanCity)}&term=restaurants&limit=10&sort_by=rating`)}`;
    
    const yelpResponse = await fetch(yelpUrl, {
      headers: {
        'Authorization': `Bearer ${YELP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!yelpResponse.ok) {
      if (yelpResponse.status === 401) {
        throw new Error('Invalid Yelp API key. Please check your configuration.');
      } else if (yelpResponse.status === 429) {
        throw new Error('Yelp API rate limit exceeded. Please try again later.');
      }
      throw new Error(`Yelp API error: ${yelpResponse.status}`);
    }

    const yelpData = await yelpResponse.json();

    if (!yelpData.businesses || yelpData.businesses.length === 0) {
      throw new Error(`No restaurants found in ${city}. Try a different city!`);
    }

    // Transform Yelp data to our format
    const restaurants = yelpData.businesses
      .slice(0, 8)
      .map(business => ({
        name: business.name,
        rating: business.rating ? business.rating.toFixed(1) : '4.0',
        type: business.categories?.[0]?.title || 'Restaurant',
        address: business.location?.display_address?.join(', ') || 'Address not available',
        price: business.price || '$$'
      }));

    return restaurants;

  } catch (error) {
    console.error('Error fetching restaurants:', error);
    
    // Provide helpful error messages
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to Yelp. Check your internet connection.');
    }
    throw error;
  }
}

/**
 * Renders restaurants in the UI
 * @param {Array} items - Array of restaurant objects
 */
export function renderRestaurants(items) {
  const list = document.getElementById('restaurants-list');
  
  if (!items || items.length === 0) {
    list.innerHTML = '<li style="color: var(--muted);">No restaurants found. Try a different city!</li>';
    return;
  }
  
  list.innerHTML = items.map(i => `
    <li style="padding: 0.75rem; background: #f8fafc; border-radius: 8px; margin-bottom: 0.5rem; border: 1px solid #e5e7eb;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
        <strong style="color: var(--text);">${i.name}</strong>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="color: var(--brand); font-weight: 500;">⭐ ${i.rating}</span>
          <span style="color: var(--accent); font-size: 0.9rem; font-weight: bold;">${i.price}</span>
        </div>
      </div>
      <div style="color: var(--muted); font-size: 0.85rem;">
        ${i.type}
      </div>
      ${i.address ? `<div style="color: var(--muted); font-size: 0.75rem; margin-top: 0.25rem;">${i.address}</div>` : ''}
    </li>
  `).join('');
}