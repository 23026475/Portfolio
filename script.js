// Replace with your OpenWeatherMap API key
const apiKey = 'f39ce3bd175c5424d6d04a08de0a2383';

function getWeatherData(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => updateWeatherCard(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function updateWeatherCard(data) {
    const locationElement = document.getElementById('location');
    const dateElement = document.getElementById('date');
    const tempElement = document.getElementById('temperature');
    const sunElement = document.querySelector('.sun');
    const cloudFront = document.querySelector('.cloud.front');
    const cloudBack = document.querySelector('.cloud.back');

    const location = `${data.name}, ${data.sys.country}`;
    const temperature = `${Math.round(data.main.temp)}°`;
    const weather = data.weather[0].main.toLowerCase();

    locationElement.textContent = location;
    dateElement.textContent = new Date().toLocaleDateString();
    tempElement.textContent = temperature;

    // Update icons based on weather
    if (weather.includes('cloud')) {
        sunElement.style.display = 'none';
        cloudFront.style.display = 'block';
        cloudBack.style.display = 'block';
    } else if (weather.includes('clear')) {
        sunElement.style.display = 'block';
        cloudFront.style.display = 'none';
        cloudBack.style.display = 'none';
    } else if (weather.includes('rain')) {
        sunElement.style.display = 'none';
        cloudFront.style.display = 'block';
        cloudBack.style.display = 'block';
        cloudFront.style.backgroundColor = '#9E9E9E';
        cloudBack.style.backgroundColor = '#9E9E9E';
    }
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherData(lat, lon);
        }, error => {
            console.error('Error getting location:', error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Initialize the weather card
getUserLocation();
