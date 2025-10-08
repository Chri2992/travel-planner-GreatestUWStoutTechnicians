
/**
 * Foursquare Places API integration for tourist attractions
 *
 * Endpoint: https://api.foursquare.com/v3/places/search
 * Docs: https://developer.foursquare.com/docs/places-api/
 *
 * Required header: Authorization: FSQ_API_KEY
 *
 * Sample usage:
 *   fetchAttractionsForCity('Madison, WI')
 *
 * Returns: Array of { name, rating, category, photo }
 *
 * If no results: returns empty array (UI will show gold-star card)
 */

export async function fetchAttractionsForCity(city) {
  const FSQ_API_KEY = 'your_key'; // Hardcoded for demo
  if (!FSQ_API_KEY || FSQ_API_KEY === 'your_key') {
    throw new Error('Foursquare API key not configured. Paste your key in attractions.js');
  }

  // Foursquare API: search for tourist attractions near city
  const url = `https://api.foursquare.com/v3/places/search?near=${encodeURIComponent(city)}&categories=16000&limit=10`;
  const headers = { 'Authorization': FSQ_API_KEY };

  try {
    const resp = await fetch(url, { headers });
    if (!resp.ok) throw new Error('Foursquare API error: ' + resp.status);
    const data = await resp.json();
    if (!data.results || data.results.length === 0) return [];

    // Map results to UI format
    return data.results.slice(0, 10).map(item => ({
      name: item.name,
      rating: item.rating || 'N/A',
      category: item.categories?.[0]?.name || 'Attraction',
      photo: item.photos?.[0]?.prefix ? `${item.photos[0].prefix}original${item.photos[0].suffix}` : null
    }));
  } catch (err) {
    console.error('Foursquare fetch error:', err);
    throw err;
  }
}


/**
 * Render gold-star card if no results
 */
export function renderAttractions(items) {
  const list = document.getElementById('attractions-list');
  if (!items || items.length === 0) {
    list.innerHTML = `<li style="background: #fffbe6; border: 2px solid #FDB827; border-radius: 10px; padding: 1rem; color: #b45309; text-align: center;">
      <div style="font-size: 2rem;">⭐</div>
      <div style="font-weight: bold;">Slim pickings—try NYC!</div>
      <div style="font-size: 0.9rem; color: #a16207;">No attractions found for your city.</div>
    </li>`;
    return;
  }
  list.innerHTML = items.map(i => `
    <li style="padding: 0.75rem; background: #f8fafc; border-radius: 8px; margin-bottom: 0.5rem; border: 1px solid #e5e7eb;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
        <strong style="color: var(--ink);">${i.name}</strong>
        <span style="color: var(--accent); font-weight: 500;">⭐ ${i.rating}</span>
      </div>
      <div style="color: var(--muted); font-size: 0.85rem;">${i.category}</div>
      ${i.photo ? `<img src="${i.photo}" alt="${i.name}" style="width: 100%; max-width: 200px; border-radius: 6px; margin-top: 0.5rem;" />` : ''}
    </li>
  `).join('');
}