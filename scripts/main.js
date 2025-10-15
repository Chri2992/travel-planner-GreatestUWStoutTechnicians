// Entry point: wires the form to feature modules.
// NOTE: For keys in a pure static site, you'll paste them directly in code during class
// or pull from a simple config object. Never commit real keys in public repos.

import { fetchWeatherForCity, renderWeather } from './weather.js';
import { fetchAttractionsForCity, renderAttractions } from './attractions.js';
import { fetchRestaurantsForCity, renderRestaurants } from './restaurants.js';

const form = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  // Show loading state
  showLoadingState();

  try {
    // Fetch weather and attractions in parallel
    const [weather, attractions] = await Promise.allSettled([
      fetchWeatherForCity(city),
      fetchAttractionsForCity(city),
    ]);

    // Chain restaurants after attractions
    const restaurants = await Promise.allSettled([
      fetchRestaurantsForCity(city),
    ]).then(results => results[0]);

    // Handle weather result
    if (weather.status === 'fulfilled') {
      renderWeather(weather.value);
    } else {
      console.error('Weather error:', weather.reason);
      document.getElementById('weather-content').innerHTML = `
        <div class="error-message" style="padding: 1rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; color: #dc2626;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">⚠️</span>
            <span>Weather: ${weather.reason.message || 'Failed to load weather data'}</span>
          </div>
        </div>
      `;
    }

    // Handle attractions result
    if (attractions.status === 'fulfilled') {
      renderAttractions(attractions.value);
    } else {
      console.error('Attractions error:', attractions.reason);
      document.getElementById('attractions-list').innerHTML = `
        <li style="padding: 1rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; color: #dc2626;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">⚠️</span>
            <span>Failed to load attractions</span>
          </div>
        </li>
      `;
    }

    // Handle restaurants result
    if (restaurants.status === 'fulfilled') {
      renderRestaurants(restaurants.value);
    } else {
      console.error('Restaurants error:', restaurants.reason);
      const errorMessage = restaurants.reason?.message || 'Failed to load restaurants';
      document.getElementById('restaurants-list').innerHTML = `
        <li style="padding: 1rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; color: #dc2626;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">⚠️</span>
            <span>${errorMessage}</span>
          </div>
        </li>
      `;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    showErrorState('An unexpected error occurred. Please try again.');
  }
});

function showLoadingState() {
  // Clear previous results
  document.getElementById('weather-content').innerHTML = `
    <div class="loading-spinner" style="display: flex; align-items: center; justify-content: center; padding: 2rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--muted);">
        <div class="spinner" style="width: 20px; height: 20px; border: 2px solid #e5e7eb; border-top: 2px solid var(--brand); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        Loading weather…
      </div>
    </div>
  `;
  
  document.getElementById('attractions-list').innerHTML = `
    <li style="display: flex; align-items: center; gap: 0.5rem; color: var(--muted); padding: 1rem;">
      <div class="spinner" style="width: 16px; height: 16px; border: 2px solid #e5e7eb; border-top: 2px solid var(--brand); border-radius: 50%; animation: spin 1s linear infinite;"></div>
      Loading attractions…
    </li>
  `;
  
  document.getElementById('restaurants-list').innerHTML = `
    <li style="display: flex; align-items: center; gap: 0.5rem; color: var(--muted); padding: 1rem;">
      <div class="spinner" style="width: 16px; height: 16px; border: 2px solid #e5e7eb; border-top: 2px solid var(--brand); border-radius: 50%; animation: spin 1s linear infinite;"></div>
      Hungry? One sec...
    </li>
  `;
}

function showErrorState(message) {
  document.getElementById('weather-content').innerHTML = `
    <div class="error-message" style="padding: 1rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; color: #dc2626;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 1.2rem;">⚠️</span>
        <span>${message}</span>
      </div>
    </div>
  `;
}
