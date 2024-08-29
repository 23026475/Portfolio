document.addEventListener('DOMContentLoaded', function () {
    // API Key and Base URL for weather
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

    // Function to fetch city and country using ipinfo.io
    function fetchLocation() {
        return fetch('https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN')
            .then(response => response.json())
            .then(data => {
                const city = data.city;
                const country = data.country;
                return { city, country };
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
                return { city: 'Unknown', country: 'Unknown' };
            });
    }

    // Function to update weather and time
    function updateWeatherAndTime(lat, lon, city, country) {
        const url = `${apiBaseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;

                // Update Body
                bodyLocationElement.innerText = `Location: ${city}, ${country}`;
                bodyWeatherDescriptionElement.textContent = `${weatherDescription} - ${temperature}°C`;
                bodyWeatherIconElement.className = `wi wi-owm-${data.weather[0].id}`;

                // Update Footer
                footerLocationElement.innerText = `Location: ${city}, ${country}`;
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
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Fetch city and country, then update weather and time
                fetchLocation().then(({ city, country }) => {
                    updateWeatherAndTime(lat, lon, city, country);
                });
            },
            function (error) {
                console.error('Error getting location:', error);
                // Fallback content if location access is denied
                bodyLocationElement.innerText = 'Location: Unavailable';
                footerLocationElement.innerText = 'Location: Unavailable';
            }
        );
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

