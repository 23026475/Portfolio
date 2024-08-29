document.addEventListener('DOMContentLoaded', function () {
    // Remember its open weather
    const apiKey = 'f39ce3bd175c5424d6d04a08de0a2383';
    const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    // Elements in Body
    const bodyLocationElement = document.getElementById('location');
    const bodyWeatherIconElement = document.getElementById('weather-icon');
    const bodyWeatherDescriptionElement = document.getElementById('weather-description');
    const bodyTimeElement = document.getElementById('time');

    // Elements in Footer
    const footerLocationElement = document.querySelector('.footer-left #location');
    const footerTimeElement = document.querySelector('.footer-left #time');
    const footerWeatherElement = document.querySelector('.footer-right #weather');

    // Function to update weather and time
    function updateWeatherAndTime(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `${apiBaseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const city = data.name;
                const region = data.sys.country; // Assuming country as the region

                // Update Body
                bodyLocationElement.textContent = `${city}, ${region}`;
                bodyWeatherDescriptionElement.textContent = `${weatherDescription} - ${temperature}°C`;
                bodyWeatherIconElement.className = `wi wi-owm-${data.weather[0].id}`;

                // Update Footer
                footerLocationElement.textContent = `Location: ${city}, ${region}`;
                footerWeatherElement.textContent = `Weather: ${weatherDescription} - ${temperature}°C`;
            })
            .catch(error => console.error('Error fetching weather data:', error));

        // Update Time
        const currentTime = new Date().toLocaleTimeString();
        bodyTimeElement.textContent = currentTime;
        footerTimeElement.textContent = `Time: ${currentTime}`;
    }

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateWeatherAndTime, function (error) {
            console.error('Error getting location:', error);
            // Fallback content if location access is denied
            bodyLocationElement.textContent = 'Location: Unavailable';
            footerLocationElement.textContent = 'Location: Unavailable';
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }

    // Optional: Update time every minute
    setInterval(() => {
        const currentTime = new Date().toLocaleTimeString();
        bodyTimeElement.textContent = currentTime;
        footerTimeElement.textContent = `Time: ${currentTime}`;
    }, 60000);
});
