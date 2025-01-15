async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = config.API_KEY;

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found.");
    } else {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const weatherCondition = data.weather[0].main.toLowerCase();

      // Update the UI with the weather data
      document.getElementById("temp-value").textContent = `${temp} °C`;
      document.getElementById("humidity-value").textContent = `${humidity} %`;
      document.getElementById("wind-value").textContent = `${windSpeed} m/s`;

      // Set the weather icon based on condition
      setWeatherIcon(weatherCondition);

      // Show the weather data section
      document.getElementById("weather-data").style.display = "block";
    }
  } catch (error) {
    alert("Error fetching data. Please try again.");
  }
}

function setWeatherIcon(condition) {
  const iconElement = document.getElementById("weather-icon");

  // Check weather condition and set the appropriate icon using else if
  if (condition === "clear") {
    iconElement.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (condition === "clouds") {
    iconElement.innerHTML = '<i class="fas fa-cloud"></i>';
  } else if (condition === "rain") {
    iconElement.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
  } else if (condition === "snow") {
    iconElement.innerHTML = '<i class="fas fa-snowflake"></i>';
  } else if (condition === "thunderstorm") {
    iconElement.innerHTML = '<i class="fas fa-bolt"></i>';
  } else {
    // Default icon for any other or unknown condition
    iconElement.innerHTML = '<i class="fas fa-cloud"></i>';
  }
}

document.getElementById("city").addEventListener("keypress", function (event) {
  // Check if the key pressed is "Enter" (key code 13)
  if (event.key === "Enter") {
    getWeather();
  }
});
