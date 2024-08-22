// Replace these with your actual API keys
const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const GEOCODING_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('time').innerHTML = `Current Time: ${timeString}`;
}

// Check if Geolocation is available
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Update time every second
        setInterval(updateTime, 1000);
        updateTime();

        // Google Maps Geocoding API URL
        const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GEOCODING_API_KEY}`;

        // Fetch location address
        fetch(geocodingApiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === "OK") {
                    const address = data.results[0].formatted_address;
                    document.getElementById("location").innerHTML = `Location: ${address}`;
                } else {
                    document.getElementById("location").innerHTML = "Unable to retrieve address.";
                }
            })
            .catch(error => {
                console.error("Error fetching location data:", error);
                document.getElementById("location").innerHTML = "Failed to retrieve address.";
            });

        // Fetch weather data using OpenWeatherMap API
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;

        fetch(weatherApiUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                document.getElementById("weather").innerHTML = `Weather: ${temperature}°C, ${description}`;
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                document.getElementById("weather").innerHTML = "Failed to fetch weather data.";
            });

    }, function(error) {
        document.getElementById("location").innerHTML = "Unable to retrieve location.";
        console.error("Error retrieving location:", error);
    });
} else {
    document.getElementById("location").innerHTML = "Geolocation is not supported by your browser.";
}
