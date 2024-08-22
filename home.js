document.addEventListener('DOMContentLoaded', () => {
    // Check if the Geolocation API is available
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Display the location information
            document.getElementById('location').textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

            // Fetch weather data using OpenWeatherMap API
            const apiKey = 'your_openweathermap_api_key';
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

            fetch(weatherApiUrl)
                .then(response => response.json())
                .then(data => {
                    const weatherDescription = data.weather[0].description;
                    const temperature = data.main.temp;
                    document.getElementById('weather').textContent = `Weather: ${weatherDescription}, Temperature: ${temperature}°C`;
                })
                .catch(error => {
                    document.getElementById('weather').textContent = 'Unable to retrieve weather data.';
                    console.error('Error fetching weather data:', error);
                });
        }, error => {
            document.getElementById('location').textContent = 'Unable to retrieve location.';
            console.error('Error getting location:', error);
        });
    } else {
        document.getElementById('location').textContent = 'Geolocation is not supported by your browser.';
    }
});
