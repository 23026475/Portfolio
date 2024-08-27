// Fetch and display location
async function getLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const region = data.region;  // Extract the region
        console.log(`Region: ${region}`);
        document.getElementById('location').textContent = `${data.city}, ${region}`;
    } catch (error) {
        console.error('Failed to fetch location data:', error);
    }
}

// Display current time
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
    return 'wi-na'; 
}
// Fetch and display weather
async function getWeather(lat, lon) {
    const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const weatherId = data.weather[0].id;  // Get weather condition ID
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;

        const weatherIconClass = getWeatherIcon(weatherId);
        document.getElementById('weather-icon').className = `wi ${weatherIconClass}`;
        document.getElementById('weather-description').textContent = `${weatherDescription}, ${temperature}°C`;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}

// Initialize
async function init() {
    const location = await getLocation();
    getWeather(location.latitude, location.longitude);
    displayTime();
    setInterval(displayTime, 1000); // Update time every second
}

window.onload = init;
