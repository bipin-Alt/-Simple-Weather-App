const weatherForm = document.querySelector(".weather-form");
const cityName = document.querySelector(".cityInput");
const results = document.querySelector(".card");
const apiKey = "82e31904053aa370cba3892bf95aaf87";

weatherForm.addEventListener("submit", async e=>{
      e.preventDefault();
    const city = cityName.value;

    if(city){
          try{
                const weatherData = await getWeatherData(city);
                displayWeatherInfo(weatherData);
          }
          catch(error){
              displayError("Failed to get weather data");
              console.error(error);
          }
    }else{
        displayError("Please enter a city");
        return;
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
         throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
const displayWeatherInfo =(data) =>{
    // destructuring the data from the API response//
    const {name:city, 
        main:{temp, humidity}, 
        weather:[{description, id}]}= data;
    results.textContent = "";
    results.style.display ="flex";
    //create elements//
    const cityDisplay = document.createElement("h3");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const  descDisplay= document.createElement("p");
    const  weatherEmoji= document.createElement("p");   

   // create elements and displaying the results to the user with necessary calculations//
    cityDisplay.textContent = `${city}`;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = ` ${description}`;
    weatherEmoji.textContent = `${getWeatherEmoji(id)}`;
    // add the class to the element that are created//
    cityDisplay.classList.add("city-display");
    tempDisplay.classList.add("temp-display");
    humidityDisplay.classList.add("humidity-display");
    descDisplay.classList.add("description-display");
    weatherEmoji.classList.add("emoji-display");
    //append child elements to the card parent element//
    results.appendChild(cityDisplay);
    results.appendChild(tempDisplay);
    results.appendChild(humidityDisplay);
    results.appendChild(descDisplay);
    results.appendChild(weatherEmoji);
}

const getWeatherEmoji= (weatherId) => {

    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";
            break;
        case(weatherId >= 300 && weatherId < 400):
        return "🌧️";
        break;
        case(weatherId >= 500 && weatherId < 600):
        return "🌧️"
        break;
        case(weatherId >= 600 && weatherId < 700):
        return "☃️";
        break;
        case(weatherId >= 700 && weatherId < 800):
        return "🌫️";
        break;
        case(weatherId === 800):
        return "☀️";
        break;
        case(weatherId >= 801 && weatherId < 810):
        return "🌥️";
        break;
        default:
            return"";
    };
};
const displayError = (message) => {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error-display");

    results.textContent ="";
    results.style.display ="flex";
    results.appendChild(errorDisplay); 
}