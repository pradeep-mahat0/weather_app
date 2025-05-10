async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "c64e13c4ebfc8a0d5c12dc885490a63f"; // Replace with your actual key
    const resultDiv = document.getElementById("result");
  
    if (city === "") {
      resultDiv.innerHTML = "<p>Please enter a city name.</p>";
      return;
    }
  
    resultDiv.innerHTML = "<p>Loading...</p>";
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
  
      if (data.cod === 200) {
        resultDiv.innerHTML = `
          <h3>${data.name}</h3>
          <p>${data.weather[0].description}</p>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Humidity: ${data.main.humidity}%</p>
        `;
      } else {
        resultDiv.innerHTML = `<p>City not found. Please try again.</p>`;
        console.error("API error:", data);
      }
    } catch (error) {
      resultDiv.innerHTML = `<p>Error fetching data. Check your internet or API key.</p>`;
      console.error("Fetch error:", error);
    }
  }
  