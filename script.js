let currentUnit = 'metric';  // Default to Celsius
let currentTempCelsius = null;

async function getLocation() {
    const apiKey = '60ea2247acdb4bae8fbbf7883ef5e95f'; // Replace with your ipgeolocation.io API key
    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const region = data.state_prov;
        const city = data.city;
        const country = data.country_name;
        document.getElementById('location').textContent = `${city}, ${region}, ${country}`;
        return { latitude: data.latitude, longitude: data.longitude };
    } catch (error) {
        console.error('Failed to fetch location data:', error);
    }
}

function displayTime() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString();
}

function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return 'wi-thunderstorm';
    if (weatherId >= 300 && weatherId < 500) return 'wi-sprinkle';
    if (weatherId >= 500 && weatherId < 600) return 'wi-rain';
    if (weatherId >= 600 && weatherId < 700) return 'wi-snow';
    if (weatherId >= 700 && weatherId < 800) return 'wi-fog';
    if (weatherId === 800) return 'wi-day-sunny';
    if (weatherId > 800 && weatherId < 900) return 'wi-cloudy';
    return 'wi-na'; // default icon if no match
}

async function getWeather(lat, lon) {
    const apiKey = 'f39ce3bd175c5424d6d04a08de0a2383';  // Replace with your OpenWeatherMap API key
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const weatherId = data.weather[0].id;  // Get weather condition ID
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;

        currentTempCelsius = currentUnit === 'metric' ? temperature : (temperature - 32) * 5 / 9;

        const weatherIconClass = getWeatherIcon(weatherId);
        document.getElementById('weather-icon').className = `wi ${weatherIconClass}`;

        document.getElementById('weather-description').textContent = `${weatherDescription}, ${temperature.toFixed(1)}°${currentUnit === 'metric' ? 'C' : 'F'}`;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}

function toggleTemperatureUnit(unit) {
    currentUnit = unit;
    const temperature = currentUnit === 'metric' ? currentTempCelsius : currentTempCelsius * 9 / 5 + 32;
    const unitSymbol = currentUnit === 'metric' ? 'C' : 'F';
    document.getElementById('weather-description').textContent = `${document.getElementById('weather-description').textContent.split(',')[0]}, ${temperature.toFixed(1)}°${unitSymbol}`;
}

document.getElementById('celsius').addEventListener('click', () => {
    if (currentUnit !== 'metric') toggleTemperatureUnit('metric');
});

document.getElementById('fahrenheit').addEventListener('click', () => {
    if (currentUnit !== 'imperial') toggleTemperatureUnit('imperial');
});

async function init() {
    const location = await getLocation();
    getWeather(location.latitude, location.longitude);
    displayTime();
    setInterval(displayTime, 1000); // Update time every second
}

window.onload = init;
