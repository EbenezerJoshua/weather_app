document.addEventListener('DOMContentLoaded', function() {
    console.log("loaded.......")

    const cityInput =document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById("weather-info")
    const cityName = document.getElementById("city-name")
    const temparatureDisplay = document.getElementById("temperature")
    const description = document.getElementById("description")
    const errorMessage = document.getElementById("error-message")

    const API_KEY = "bf493e6ab5778ed48e3a6f094529646a"

    getWeatherBtn.addEventListener("click", async function() {
        const city = cityInput.value.trim()
        if(!city) return;
        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherInfo(weatherData)
        } catch (error) {
            showError()
        }
    })

    async function fetchWeatherData(city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        const res = await fetch(url)

        if(!res.ok) {
            throw new Error("City is not found")
        }

        const data = await res.json()
        return data
    }

    function displayWeatherInfo(data) {
        const { name, main, weather } = data
        cityName.textContent = name
        temparatureDisplay.textContent = `Temperature: ${main.temp}°C`
        description.textContent = `Weather: ${weather[0].description}`

        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")
    }

    function showError() {
        weatherInfo.classList.add("hidden")
        errorMessage.classList.remove("hidden")
    }
})