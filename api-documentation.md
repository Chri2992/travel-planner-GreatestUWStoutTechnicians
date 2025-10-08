# API Notes (Team)

- Weather: OpenWeather (Current + Forecast)
- Places: Google Places **or** Yelp Fusion
- Rate limits: Document what you see during testing.
- Keys: Never commit real keys. Use `.env.example` to share key names only.
- Error handling: Show friendly messages for 4xx/5xx or empty results.

## Restaurant Implementation (Google Places API)

### Features Implemented:
- **Search Range**: 5-10 restaurants per city search
- **Data Fields**: Name, rating, price level, address, restaurant type
- **Loading Message**: "Hungry? One sec..." with spinner animation
- **Price Display**: Gold coin emojis (💰) representing price level (1-4 coins)
- **Chaining**: Restaurants load after attractions complete (sequential loading)
- **Error Handling**: Friendly error messages for API failures and empty results

### API Configuration:
- **Service**: Google Places Text Search API
- **Endpoint**: `https://maps.googleapis.com/maps/api/place/textsearch/json`
- **Required Fields**: `name,rating,types,formatted_address,price_level,place_id`
- **CORS Proxy**: Uses `api.allorigins.win` for cross-origin requests
- **Rate Limits**: $200 free credit per month (generous for development)

### Data Flow:
1. User enters city name
2. Weather and attractions load in parallel
3. After attractions complete, restaurants API is called
4. Results filtered to local restaurants only
5. Data transformed with gold price icons
6. UI updated with restaurant cards

### Error Scenarios Handled:
- Invalid/expired API key
- Places API not enabled
- No restaurants found in city
- Network connectivity issues
- CORS proxy failures