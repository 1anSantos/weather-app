// Chave API - Clima
const apiWeatherKey = "c06d17ba99219c0efb01f7f9a77032fd";

// Elementos HTML
const cityInput = document.querySelector("#city-input");
const getWeatherBtn = document.querySelector("#get-weather");

// Elementos HTML
// Cidade e País
const city = document.querySelector("#city");
const country = document.querySelector("#country");
const countryImg = document.querySelector("#country-img");

// Temperatura e Clima
const weatherImgContainer = document.querySelector("#weather-img-container");
const weatherImg = document.querySelector("#weather-img");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");

// Informações Adicionais
const fellsLike = document.querySelector("#fells-like .information span");
const cloud = document.querySelector("#cloud .information span");
const humidity = document.querySelector("#humidity .information span");
const wind = document.querySelector("#wind .information span");

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
    cityInput.value = "";

    fetch(apiWeatherUrl)
        .then(response => response.json())
        .then(data => {
            getCountryName(data.sys.country)
                .then(countryName => {
                    // mostrar no console
                    weatherImgContainer.style.display = "block";

                    // Cidade, País e Bandeira
                    city.innerHTML = data.name;
                    country.innerHTML = countryName;
                    countryImg.src = `https://flagcdn.com/h20/${data.sys.country.toLowerCase()}.png`;
                    
                    // Icone do Clima, Temperatura e clima
                    weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                    temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
                    description.innerHTML = data.weather[0].description;
                    
                    // Informações adicionais
                    fellsLike.innerHTML = `${Math.round(data.main.feels_like)} °C`;
                    cloud.innerHTML = `${data.clouds.all}%`;
                    humidity.innerHTML = `${data.main.humidity}%`;
                    wind.innerHTML = `${data.wind.speed} m/s`;

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