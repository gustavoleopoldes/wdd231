
const API_KEY = '88a7625aec57e563b75fa1399a366cd5';
const CITY = 'Florianopolis,br';

const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('weather-forecast');

async function getCurrentWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();

    const weatherHTML = `
      <div class="weather-info">
        <h3>${Math.round(data.main.temp)}°C</h3>
        <p>${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
      </div>
      <img 
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
        alt="${data.weather[0].description}" 
        class="weather-icon"
      >
    `;
    
    currentWeatherContainer.innerHTML = weatherHTML;

    getForecast();
    
  } catch (error) {
    console.error('Error fetching current weather:', error);
    currentWeatherContainer.innerHTML = '<p>Unable to load weather data. Please try again later.</p>';
  }
}

async function getForecast() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`);
    
    if (!response.ok) {
      throw new Error('Forecast data not available');
    }
    
    const data = await response.json();

    const threeDayForecast = data.list
      .filter(item => item.dt_txt.includes('12:00:00'))
      .slice(0, 3);

    let forecastHTML = '<h3>3-Day Forecast</h3>';
    
    threeDayForecast.forEach(day => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      forecastHTML += `
        <div class="forecast-day">
          <span>${dayName}</span>
          <span>${Math.round(day.main.temp)}°C</span>
          <img 
            src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" 
            alt="${day.weather[0].description}"
            width="30" height="30"
          >
        </div>
      `;
    });
    
    forecastContainer.innerHTML = forecastHTML;
    
  } catch (error) {
    console.error('Error fetching forecast:', error);
    forecastContainer.innerHTML = '<p>Unable to load forecast data.</p>';
  }
}

document.addEventListener('DOMContentLoaded', getCurrentWeather);