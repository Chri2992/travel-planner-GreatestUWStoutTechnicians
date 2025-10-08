# 🧭 Blue Devil Travel Planner - CNIT 381

A modern web application that helps users plan their trips by providing weather information, local attractions, and restaurant recommendations for any city.

## 🌟 Features

- **Weather Information**: Current weather and 3-day forecast using OpenWeatherMap API
- **Local Attractions**: Tourist attractions and points of interest using Google Places API
- **Restaurant Recommendations**: Local dining options with ratings and price levels
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Data**: All information is fetched live from APIs

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- API keys for the services (see setup instructions below)

### Running the Application
1. Open `index.html` in your web browser
2. Enter a city name (e.g., "Madison, WI" or "New York")
3. Click "Search" to see weather, attractions, and restaurants

## 🔧 Setup Instructions

### Step 1: Get API Keys

#### OpenWeatherMap API (Weather)
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to "My API Keys" section
4. Copy your API key
5. Replace `YOUR_API_KEY_HERE` in `scripts/weather.js` (line 7)

#### Google Places API (Attractions & Restaurants)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Places API" in the API Library
4. Go to "Credentials" and create an API key
5. Replace `YOUR_API_KEY_HERE` in both:
   - `scripts/attractions.js` (line 8)
   - `scripts/restaurants.js` (line 8)

### Step 2: Configure API Keys

Open each file and replace the placeholder:

**weather.js:**
```javascript
const API_KEY = 'your-openweathermap-api-key-here';
```

**attractions.js:**
```javascript
const GOOGLE_API_KEY = 'your-google-places-api-key-here';
```

**restaurants.js:**
```javascript
const GOOGLE_API_KEY = 'your-google-places-api-key-here';
```

### Step 3: Test the Application
1. Open `index.html` in your browser
2. Enter a city name
3. Verify all three sections load data

## 📁 Project Structure

```
travel-planner/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── scripts/
│   ├── main.js         # Main application logic
│   ├── weather.js      # Weather API integration
│   ├── attractions.js  # Attractions API integration
│   └── restaurants.js  # Restaurants API integration
└── README.md           # This file
```

## 🛠️ Technical Details

### APIs Used
- **OpenWeatherMap API**: Weather data and forecasts
- **Google Places API**: Attractions and restaurant data

### Technologies
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Application logic and API integration
- **Fetch API**: HTTP requests to external APIs

### Key Features
- **CORS Handling**: Uses proxy to handle cross-origin requests
- **Error Handling**: Comprehensive error messages for API failures
- **Location Filtering**: Ensures results are from the requested city
- **Responsive Design**: Mobile-friendly interface

## 🎯 Learning Objectives

After completing this project, students will understand:
- How to integrate third-party APIs into web applications
- Handling asynchronous operations with Promises and async/await
- CORS (Cross-Origin Resource Sharing) and how to work around it
- Error handling in JavaScript applications
- DOM manipulation and dynamic content creation
- Responsive web design principles

## 🐛 Troubleshooting

### Common Issues

**"API key not configured" error:**
- Make sure you've replaced all placeholder API keys
- Verify the API keys are correct and active

**"Invalid API key" error:**
- Check that your API keys are valid
- For OpenWeatherMap: Ensure the key is activated (check email)
- For Google Places: Ensure Places API is enabled

**"No results found" error:**
- Try a larger city name
- Check your internet connection
- Verify API quotas haven't been exceeded

**CORS errors:**
- The application uses a CORS proxy - this is normal
- If the proxy is down, the app may not work temporarily

### Getting Help
- Check the browser console (F12) for detailed error messages
- Verify all API keys are properly configured
- Test with well-known cities like "New York" or "London"

## 📝 Assignment Requirements

### Basic Requirements (70 points)
- [ ] Set up both API keys correctly
- [ ] Weather section displays current weather and 3-day forecast
- [ ] Attractions section shows local tourist attractions
- [ ] Restaurants section displays local dining options
- [ ] All sections work for different cities

### Advanced Requirements (30 points)
- [ ] Add loading animations while data loads
- [ ] Implement error handling for failed API calls
- [ ] Add more detailed information (e.g., restaurant hours, attraction descriptions)
- [ ] Improve the UI/UX design
- [ ] Add a "favorites" feature to save preferred locations

## 🎨 Customization Ideas

- Change the color scheme to match your preferences
- Add more weather details (humidity, wind direction, etc.)
- Include photos for attractions and restaurants
- Add a map view using Google Maps API
- Implement user authentication and saved searches
- Add social sharing features

## 📚 Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Web Docs - JavaScript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 📄 License

This project is for educational purposes in CNIT 381 at University of Wisconsin-Stout.

---

**Go Blue Devils! 🏆**

*Built with ❤️ for CNIT 381 students*