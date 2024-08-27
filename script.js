// script.js

let currentUnit = 'metric';  // Default to Celsius
let currentTempCelsius = null;

// Replace with your actual API keys
const GOOGLE_GEOCODING_API_KEY = 'YOUR_GOOGLE_GEOCODING_API_KEY';
const OPENWEATHERMAP_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

// Function to display the current time
function displayTime() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString();
}

// Function to map weather condition codes to Weather Icons classes
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

// Function to perform reverse geocoding using Google Geocoding API
async function reverseGeocode(lat, lon) {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_GEOCODING_API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.status !== 'OK') {
            throw new Error('Geocoding API error: ' + data.status);
        }

        // Extract address components
        const addressComponents = data.results[0].address_components;
        let city = '';
        let state = '';
        let country = '';
        let street = '';
        let streetNumber = '';

        addressComponents.forEach(component => {
            if (component.types.includes('locality')) {
                city = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
                state = component.long_name;
            }
            if (component.types.includes('country')) {
                country = component.long_name;
            }
            if (component.types.includes('street_number')) {
                streetNumber = component.long_name;
            }
            if (component.types.includes('route')) {
                street = component.long_name;
            }
        });

        const address = `${streetNumber} ${street}, ${city}, ${state}, ${country}`;
        document.getElementById('location').textContent = address;

    } catch (error) {
        console.error('Reverse geocoding failed:', error);
        document.getElementById('location').textContent = 'Unable to retrieve location';
    }
}

// Function to get weather data from OpenWeatherMap
async function getWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${OPENWEATHERMAP_API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const weatherId = data.weather[0].id;
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;

        // Store the temperature in Celsius for toggling
        currentTempCelsius = currentUnit === 'metric' ? temperature : (temperature - 32) * 5 / 9;

        // Set the weather icon
        const weatherIconClass = getWeatherIcon(weatherId);
        document.getElementById('weather-icon').innerHTML = `<i class="wi ${weatherIconClass}"></i>`;

        // Display weather description and temperature
        document.getElementById('weather-description').textContent = `${capitalizeFirstLetter(weatherDescription)}, ${temperature.toFixed(1)}°${currentUnit === 'metric' ? 'C' : 'F'}`;

    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        document.getElementById('weather-description').textContent = 'Unable to retrieve weather data';
    }
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to toggle temperature unit
function toggleTemperatureUnit(unit) {
    if (unit === 'metric') {
        currentUnit = 'metric';
        document.getElementById('celsius').classList.add('active');
        document.getElementById('fahrenheit').classList.remove('active');
    } else if (unit === 'imperial') {
        currentUnit = 'imperial';
        document.getElementById('fahrenheit').classList.add('active');
        document.getElementById('celsius').classList.remove('active');
    }

    if (currentTempCelsius !== null) {
        const temperature = currentUnit === 'metric' ? currentTempCelsius : (currentTempCelsius * 9 / 5) + 32;
        const unitSymbol = currentUnit === 'metric' ? 'C' : 'F';
        const weatherDescriptionText = document.getElementById('weather-description').textContent.split(',')[0];
        document.getElementById('weather-description').textContent = `${weatherDescriptionText}, ${temperature.toFixed(1)}°${unitSymbol}`;
    }
}

// Event listeners for temperature toggle buttons
document.getElementById('celsius').addEventListener('click', () => {
    if (currentUnit !== 'metric') toggleTemperatureUnit('metric');
});

document.getElementById('fahrenheit').addEventListener('click', () => {
    if (currentUnit !== 'imperial') toggleTemperatureUnit('imperial');
});

// Initialize the widget
function init() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Perform reverse geocoding to get detailed address
            await reverseGeocode(lat, lon);

            // Fetch and display weather data
            await getWeather(lat, lon);

            // Display current time and update every second
            displayTime();
            setInterval(displayTime, 1000);

        }, function(error) {
            console.error('Error retrieving geolocation:', error);
            document.getElementById('location').textContent = 'Location access denied';
            document.getElementById('weather-description').textContent = 'Unable to retrieve weather data';
            document.getElementById('weather-icon').innerHTML = '<i class="wi wi-na"></i>';
            displayTime();
            setInterval(displayTime, 1000);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        document.getElementById('location').textContent = 'Geolocation not supported';
        document.getElementById('weather-description').textContent = 'Unable to retrieve weather data';
        document.getElementById('weather-icon').innerHTML = '<i class="wi wi-na"></i>';
        displayTime();
        setInterval(displayTime, 1000);
    }
}

window.onload = init;
