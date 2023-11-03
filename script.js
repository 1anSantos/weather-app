// Chave API - Clima
const apiWeatherKey = "c06d17ba99219c0efb01f7f9a77032fd";

// Elementos HTML
const cityInput = document.querySelector("#city-input");
const getWeatherBtn = document.querySelector("#get-weather");
const weatherResult = document.querySelector("#weather-result");


// Event Listeners
cityInput.addEventListener("keydown", (event) =>{
    if (event.key !== "Enter") return;
    getWeatherByAPI();
});

getWeatherBtn.addEventListener("click", getWeatherByAPI);


// Functions
function getWeatherByAPI() {
    const city = cityInput.value;
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&limit=5&lang=pt_br&units=metric`;
    
    fetch(apiWeatherUrl)
        .then(response => response.json())
        .then(data => {
            getCountryName(data.sys.country)
                .then(countryName => {
                    console.log(data)
                    weatherResult.innerHTML = `
                        <h2>Clima em ${data.name}, ${countryName}</h2>
                        <p>Temperatura: ${data.main.temp}°C</p>
                        <p>Tempo: ${data.weather[0].description}</p>
                        <img src="https://flagcdn.com/h60/${data.sys.country.toLowerCase()}.png" alt="${countryName}">`;
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao obter o nome do país:', error);
                });
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

async function getCountryName(countryISO3166Alpha2) {
    const apiCountryUrl = `https://servicodados.ibge.gov.br/api/v1/paises/${countryISO3166Alpha2}`;

    try {
        const response = await fetch(apiCountryUrl);
        const data = await response.json();
        const countryName = data[0].nome.abreviado;
        return countryName;
    } catch (error) {
        throw error;
    }
}