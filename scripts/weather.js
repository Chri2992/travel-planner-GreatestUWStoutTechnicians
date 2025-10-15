/**
 * Weather integration with OpenWeatherMap API
 * Fetches current weather and 3-day forecast for a given city
 */

// ⚠️ STUDENTS: Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key
const API_KEY = '3042d72cdf0a3caadc4430452a7f5632';

export async function fetchWeatherForCity(city) {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error(
      'OpenWeatherMap API key not configured. Please:\n' +
      '1. Sign up at https://openweathermap.org/api\n' +
      '2. Get your free API key\n' +
      '3. Replace YOUR_API_KEY_HERE in weather.js'
    );
  }

  try {
    // Clean up city name - remove state/country codes and extra spaces
    const cleanCity = city.split(',')[0].trim();
    
    // Fetch current weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cleanCity)}&appid=${API_KEY}&units=imperial`;
    const currentResponse = await fetch(currentWeatherUrl);
    
    if (!currentResponse.ok) {
      if (currentResponse.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      } else if (currentResponse.status === 401) {
        throw new Error('Invalid API key. Please check your weather API configuration.');
      } else {
        throw new Error(`Weather service error: ${currentResponse.status}`);
      }
    }
    
    const currentData = await currentResponse.json();

    // Fetch 5-day forecast (we'll use the first 3 days)
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cleanCity)}&appid=${API_KEY}&units=imperial`;
    const forecastResponse = await fetch(forecastUrl);
    
    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch weather forecast');
    }
    
    const forecastData = await forecastResponse.json();

    // Process forecast data to get daily highs and lows
    const dailyForecasts = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    forecastData.list.forEach(item => {
      const itemDate = new Date(item.dt * 1000);
      const itemDateString = itemDate.toDateString();
      
      // Skip today's data since we already have current weather
      if (itemDateString === today.toDateString()) {
        return;
      }
      
      if (!dailyForecasts[itemDateString]) {
        dailyForecasts[itemDateString] = {
          temps: [],
          descriptions: [],
          date: itemDate
        };
      }
      dailyForecasts[itemDateString].temps.push(item.main.temp);
      dailyForecasts[itemDateString].descriptions.push(item.weather[0].description);
    });

    // Get the next 3 days of forecast (skip today)
    const sortedDates = Object.keys(dailyForecasts).sort((a, b) => {
      return new Date(a) - new Date(b);
    });
    
    const forecast = sortedDates.slice(0, 3).map((dateString, index) => {
      const dayData = dailyForecasts[dateString];
      const dayNames = ['Tomorrow', 'Day After', 'Day 3'];
      
      // Get the most common description for the day
      const descriptionCounts = {};
      dayData.descriptions.forEach(desc => {
        descriptionCounts[desc] = (descriptionCounts[desc] || 0) + 1;
      });
      const mostCommonDesc = Object.keys(descriptionCounts).reduce((a, b) => 
        descriptionCounts[a] > descriptionCounts[b] ? a : b
      );
      
      return {
        day: dayNames[index] || `Day ${index + 2}`,
        hi: Math.round(Math.max(...dayData.temps)),
        lo: Math.round(Math.min(...dayData.temps)),
        description: mostCommonDesc
      };
    });

    return {
      city: currentData.name,
      description: currentData.weather[0].description,
      tempF: Math.round(currentData.main.temp),
      humidity: currentData.main.humidity,
      windSpeed: currentData.wind.speed,
      forecast: forecast
    };
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to weather service. Please check your internet connection.');
    }
    throw error;
  }
}

export function renderWeather(w) {
  const el = document.getElementById('weather-content');
  
  // Capitalize first letter of description
  const capitalizeDescription = (desc) => desc.charAt(0).toUpperCase() + desc.slice(1);
  
  el.innerHTML = `
    <div class="current-weather">
      <div class="weather-header">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--ink);">${w.city}</h3>
        <div class="current-temp" style="font-size: 2rem; font-weight: bold; color: var(--brand);">
          ${w.tempF}&deg;F
        </div>
        <div class="weather-desc" style="color: var(--muted); margin-bottom: 1rem;">
          ${capitalizeDescription(w.description)}
        </div>
      </div>
      
      <div class="weather-details" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.9rem;">
        <div class="detail-item">
          <span style="color: var(--muted);">Humidity:</span>
          <span style="font-weight: 500;">${w.humidity}%</span>
        </div>
        <div class="detail-item">
          <span style="color: var(--muted);">Wind:</span>
          <span style="font-weight: 500;">${w.windSpeed} mph</span>
        </div>
      </div>
    </div>
    
    <div class="forecast-section">
      <h4 style="margin: 0 0 0.75rem 0; color: var(--ink); font-size: 1rem;">3-Day Forecast</h4>
      <div class="forecast-cards" style="display: grid; gap: 0.5rem;">
        ${w.forecast.map(f => `
          <div class="forecast-card" style="padding: 0.75rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e5e7eb;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 500; color: var(--ink);">${f.day}</span>
              <span style="color: var(--brand); font-weight: bold;">${f.hi}&deg;/${f.lo}&deg;</span>
            </div>
            <div style="color: var(--muted); font-size: 0.85rem; margin-top: 0.25rem;">
              ${capitalizeDescription(f.description)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
