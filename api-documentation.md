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
	- If no results: UI shows gold-star card (“Slim pickings—try NYC!”)
- Rate limits: Document what you see during testing.
- Keys: Never commit real keys. Use `.env.example` to share key names only.
- Error handling: Show friendly messages for 4xx/5xx or empty results.