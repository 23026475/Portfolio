// Function to get and display user location and time
function updateLocationAndTime() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Example API call to get location name (replace with actual API)
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('location').innerText = `Location: ${data.city}`;
                });

            // Update time every second
            setInterval(() => {
                const now = new Date();
                document.getElementById('time').innerText = `Time: ${now.toLocaleTimeString()}`;
            }, 1000);
        });
    } else {
        document.getElementById('location').innerText = "Geolocation is not supported by this browser.";
    }
}

// Function to get and display weather data
function updateWeather() {
    // Example API call to get weather (replace with actual API and key)
    const lat = '0'; // Replace with dynamic latitude
    const lon = '0'; // Replace with dynamic longitude
    const apiKey = 'f39ce3bd175c5424d6d04a08de0a2383';

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('weather').innerText = `Weather: ${data.weather[0].description}, ${data.main.temp}°C`;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        });
}

// Initialize functions
updateLocationAndTime();
updateWeather();
