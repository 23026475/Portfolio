// Check if Geolocation is available
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Display the user's location
        const locationDiv = document.getElementById("location");
        locationDiv.innerHTML = `Latitude: ${lat.toFixed(2)}, Longitude: ${lon.toFixed(2)}`;

        // Fetch weather data using a weather API
        const apiKey = 'https://geocode.maps.co/api/verify_account/66c6f9f03083a612151762slf58b9c7';
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(weatherApiUrl)
            .then(response => response.json())
            .then(data => {
                const weatherDiv = document.getElementById("weather");
                const temperature = data.main.temp;
                const description = data.weather[0].description;

                weatherDiv.innerHTML = `Temperature: ${temperature}°C<br>Description: ${description}`;
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
