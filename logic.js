
const apiKey = '9f4e34d6ca994a2abe673443231808';


var city = document.getElementById('city');

const submitForm = document.querySelector('#userForm');
const errMessage = document.querySelector('#error');
submitForm.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    errMessage.innerHTML = ''
    event.preventDefault();
    var inputValue = city.value.trim();
    if (inputValue !== '') {
        getWeather(inputValue);
    }
}

function getWeather(userLocation){
    
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${userLocation}`, {mode: "cors"})
       .then(function(response){
          
          console.log(response.status);
          if(response.status === 400){
            throw new Error("Whoops!");
          }
          return response.json();
       })
       .then(function(data){
        console.log(data);
        const city = data.location.name;
        const weatherInCel = data.current.temp_c;
        const weatherInFar = data.current.temp_f;
        const country = data.location.country;
        const conditions = data.current.condition.text;
        const weIcon = data.current.condition.icon;
        
        function dataObject(country, city, celsius, faranheit, conditions, weIcon) {
            this.country = country;
            this.city = city;
            this.weatherInCel = celsius;
            this.weatherInFar = faranheit;
            this.conditions = conditions;
            this.icon = weIcon;
          }
          
        let appData = new dataObject(country, city, weatherInCel, weatherInFar, conditions, weIcon);
        return appData;
          
       })
       .then(function(weatherData){
           console.log(weatherData.country);
           console.log(weatherData.weatherInCel);
           console.log(weatherData.weatherInFar);
           console.log(weatherData.city)

        const location = document.querySelector('#location');
        location.innerHTML = weatherData.city + ',&nbsp' + weatherData.country

        const weather = document.querySelector('#weatherDisplay');
        weather.innerHTML = weatherData.weatherInCel + '°C' +  '&nbsp&nbsp&nbsp' + weatherData.weatherInFar + '°F';

        const conditions = document.querySelector('#conditions');
        conditions.innerHTML = weatherData.conditions

        const parent = document.querySelector('#iconDisplay')
        const child = document.querySelector('#icon')
        
        child.src = "https://" + weatherData.icon;
        parent.appendChild(child)
       })
       .catch(error => {
        console.error('Enter a Valid Location!');
        errMessage.innerHTML = 'Enter a Valid Location!'
      });
       

}

