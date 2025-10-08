# 🔧 Environment Variables Guide

## Current Implementation

This project currently uses **hardcoded constants** in the JavaScript files, not environment variables. This is simpler for educational purposes and doesn't require a build process.

## API Key Configuration

Students should replace the API keys directly in these files:

### Weather API (OpenWeatherMap)
**File:** `scripts/weather.js` (line 7)
```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```
**Replace with:** `const API_KEY = 'your_actual_openweathermap_key';`

### Places API (Google)
**File:** `scripts/attractions.js` (line 8)
```javascript
const GOOGLE_API_KEY = 'YOUR_API_KEY_HERE';
```
**Replace with:** `const GOOGLE_API_KEY = 'your_actual_google_key';`

**File:** `scripts/restaurants.js` (line 8)
```javascript
const GOOGLE_API_KEY = 'YOUR_API_KEY_HERE';
```
**Replace with:** `const GOOGLE_API_KEY = 'your_actual_google_key';`

## If You Want to Use Environment Variables

To use actual environment variables, you would need to:

### Option 1: Simple .env Loader
1. Create a `.env` file:
```
API_KEY=your_openweathermap_key
GOOGLE_API_KEY=your_google_key
```

2. Add this script to your HTML before other scripts:
```html
<script>
  // Simple .env loader
  fetch('.env')
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
          window[key] = value;
        }
      });
    });
</script>
```

3. Update your JavaScript files to use `window.API_KEY` and `window.GOOGLE_API_KEY`

### Option 2: Build Process
Use a bundler like Webpack, Vite, or Parcel that can inject environment variables at build time.

## Recommended Approach for Students

For this educational project, we recommend the **hardcoded constants approach** because:
- ✅ Simpler setup (no build process needed)
- ✅ Easier to debug and understand
- ✅ Works directly in any web browser
- ✅ Teaches API integration concepts clearly

## Security Note

**Important:** Never commit real API keys to version control!

- Use placeholder values in your code
- Keep real API keys in a separate, private file
- Add `.env` to your `.gitignore` file
- Use environment variables in production

## Variable Names Reference

| Purpose | Variable Name | File Location |
|---------|---------------|---------------|
| Weather API | `API_KEY` | `scripts/weather.js` |
| Places API | `GOOGLE_API_KEY` | `scripts/attractions.js` |
| Places API | `GOOGLE_API_KEY` | `scripts/restaurants.js` |

## Getting API Keys

### OpenWeatherMap
1. Go to https://openweathermap.org/api
2. Sign up for free account
3. Get API key from "My API Keys" section
4. Replace `YOUR_API_KEY_HERE` in `weather.js`

### Google Places
1. Go to https://console.cloud.google.com/
2. Create project or select existing
3. Enable "Places API" in API Library
4. Create API key in Credentials
5. Replace `YOUR_API_KEY_HERE` in both `attractions.js` and `restaurants.js`
