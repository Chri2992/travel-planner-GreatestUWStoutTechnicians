# API Notes (Team)

- Weather: OpenWeather (Current + Forecast)
- Places: Foursquare Places API (FSQ_API_KEY, hardcoded in attractions.js)
	- Endpoint: https://api.foursquare.com/v3/places/search
	- Usage: Search 5–10 tourist attractions near a city
	- Required header: Authorization: FSQ_API_KEY
	- Sample request:
		```js
		fetch('https://api.foursquare.com/v3/places/search?near=Madison,WI&categories=16000&limit=10', {
			headers: { Authorization: 'HU5JM2CD5RDMT4P42HQNHDRJ4ZDZNEHOTH2SZNIDZTOGWULE' }
		})
		```
	- Sample response item:
		```json
		{
			"name": "Wisconsin State Capitol",
			"rating": 9.2,
			"category": "Tourist Attraction",
			"photo": "https://fastly.4sqi.net/img/general/original/12345.jpg"
		}
		```
	- If no results: UI shows gold-star card ("Slim pickings—try NYC!")
- Restaurants: Yelp Fusion API (YELP_API_KEY, hardcoded in restaurants.js)
	- Endpoint: https://api.yelp.com/v3/businesses/search
	- Usage: Search 5–10 restaurants in city with name/rating/price/address
	- Required header: Authorization: Bearer YELP_API_KEY
	- Sample request:
		```js
		fetch('https://api.yelp.com/v3/businesses/search?location=Madison,WI&term=restaurants&limit=10&sort_by=rating', {
			headers: { Authorization: 'Bearer your_yelp_api_key' }
		})
		```
	- Sample response item:
		```json
		{
			"name": "The Old Fashioned",
			"rating": 4.5,
			"price": "$$",
			"categories": [{"title": "American"}],
			"location": {
				"display_address": ["23 N Pinckney St", "Madison, WI 53703"]
			}
		}
		```
	- Loading message: "Hungry? One sec..."
	- Price icons styled in gold color
- Rate limits: Document what you see during testing.
- Keys: Never commit real keys. Use `.env.example` to share key names only.
- Error handling: Show friendly messages for 4xx/5xx or empty results.