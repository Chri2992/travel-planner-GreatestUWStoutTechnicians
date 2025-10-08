# 🔄 API Alternatives Guide

## Easy API Swapping

The project is designed to make it easy to switch between different APIs. Students can easily replace Google Places API with Foursquare or Yelp.

## Current API Setup

| Service | Current API | Alternative APIs |
|---------|-------------|------------------|
| Weather | OpenWeatherMap | AccuWeather, WeatherAPI |
| Attractions | Google Places | Foursquare, Yelp |
| Restaurants | Google Places | Foursquare, Yelp |

## Switching to Foursquare API

### Step 1: Get Foursquare API Key
1. Go to https://location.foursquare.com/developer/
2. Sign up for free account (99,500 calls/month free!)
3. Create a new project
4. Copy your API key

### Step 2: Update Attractions (attractions.js)

Replace the Google Places code with Foursquare:

```javascript
// Replace the Google Places section with:
const FSQ_API_KEY = 'YOUR_FOURSQUARE_API_KEY_HERE';

export async function fetchAttractionsForCity(city) {
  if (!FSQ_API_KEY || FSQ_API_KEY === 'YOUR_FOURSQUARE_API_KEY_HERE') {
    throw new Error('Foursquare API key not configured');
  }

  try {
    const cleanCity = city.split(',')[0].trim();
    
    // Geocode the city
    const geoUrl = `https://api.foursquare.com/v3/autocomplete?query=${encodeURIComponent(cleanCity)}&types=geo&limit=1`;
    const geoResponse = await fetch(geoUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': FSQ_API_KEY
      }
    });

    if (!geoResponse.ok) throw new Error('Geocoding failed');
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${city}" not found`);
    }

    const location = geoData.results[0].geo_bounds.circle;
    const { latitude, longitude } = location.center;

    // Search for attractions
    const placesUrl = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&categories=16000&limit=10&sort=POPULARITY`;
    
    const placesResponse = await fetch(placesUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': FSQ_API_KEY
      }
    });

    if (!placesResponse.ok) throw new Error('Places search failed');
    const placesData = await placesResponse.json();

    if (!placesData.results || placesData.results.length === 0) {
      throw new Error(`No attractions found in ${city}`);
    }

    // Transform data
    const attractions = placesData.results.slice(0, 8).map(place => ({
      name: place.name,
      rating: place.rating ? (place.rating / 2).toFixed(1) : '4.0',
      type: place.categories?.[0]?.name || 'Attraction',
      address: place.location?.formatted_address || 'Address not available'
    }));

    return attractions;
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
}
```

### Step 3: Update Restaurants (restaurants.js)

Similar changes for restaurants:

```javascript
// Replace the Google Places section with:
const FSQ_API_KEY = 'YOUR_FOURSQUARE_API_KEY_HERE';

export async function fetchRestaurantsForCity(city) {
  // Similar implementation but with categories=13000 for restaurants
  // ... (rest of the code similar to attractions)
}
```

## Switching to Yelp API

### Step 1: Get Yelp API Key
1. Go to https://www.yelp.com/developers/
2. Sign up for free account
3. Create a new app
4. Copy your API key

### Step 2: Update Both Files

```javascript
// Replace Google Places with Yelp
const YELP_API_KEY = 'YOUR_YELP_API_KEY_HERE';

export async function fetchAttractionsForCity(city) {
  if (!YELP_API_KEY || YELP_API_KEY === 'YOUR_YELP_API_KEY_HERE') {
    throw new Error('Yelp API key not configured');
  }

  try {
    const cleanCity = city.split(',')[0].trim();
    
    // Yelp Business Search API
    const url = `https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(cleanCity)}&categories=tourist_attractions&limit=10&sort_by=rating`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${YELP_API_KEY}`
      }
    });

    if (!response.ok) throw new Error('Yelp API request failed');
    const data = await response.json();

    if (!data.businesses || data.businesses.length === 0) {
      throw new Error(`No attractions found in ${city}`);
    }

    // Transform Yelp data
    const attractions = data.businesses.slice(0, 8).map(business => ({
      name: business.name,
      rating: business.rating ? business.rating.toFixed(1) : '4.0',
      type: business.categories?.[0]?.title || 'Attraction',
      address: business.location?.address1 || 'Address not available',
      price: business.price || '$$'
    }));

    return attractions;
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
}
```

## API Comparison

| Feature | Google Places | Foursquare | Yelp |
|---------|---------------|------------|------|
| **Free Tier** | $200 credit/month | 99,500 calls/month | 500 calls/day |
| **Setup Difficulty** | Medium | Easy | Easy |
| **Data Quality** | Excellent | Good | Excellent |
| **CORS Issues** | Yes (needs proxy) | No | No |
| **Documentation** | Good | Good | Excellent |

## Quick Switch Template

### For Foursquare:
1. Replace `GOOGLE_API_KEY` with `FSQ_API_KEY`
2. Update API endpoints to Foursquare URLs
3. Add Authorization header: `'Authorization': FSQ_API_KEY`
4. Update data transformation logic

### For Yelp:
1. Replace `GOOGLE_API_KEY` with `YELP_API_KEY`
2. Update API endpoints to Yelp URLs
3. Add Authorization header: `'Authorization': 'Bearer ${YELP_API_KEY}'`
4. Update data transformation logic

## Benefits of Switching

### Foursquare Advantages:
- ✅ No CORS issues (works directly in browser)
- ✅ Generous free tier
- ✅ Easy setup
- ✅ Good for educational projects

### Yelp Advantages:
- ✅ No CORS issues
- ✅ Excellent data quality
- ✅ Great documentation
- ✅ Popular for restaurant data

## Student Assignment Options

### Option 1: Use Google Places (Current)
- Learn CORS concepts
- More complex setup
- Professional-grade API

### Option 2: Switch to Foursquare
- Simpler implementation
- No CORS issues
- Good learning experience

### Option 3: Switch to Yelp
- Different API structure
- Excellent documentation
- Real-world API experience

## Code Structure Benefits

The current code structure makes switching easy because:
- ✅ Clear separation of concerns
- ✅ Consistent error handling
- ✅ Modular design
- ✅ Easy to identify what needs changing

Students can experiment with different APIs and learn how to adapt code for different services!
