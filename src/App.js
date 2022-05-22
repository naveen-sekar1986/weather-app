import React,{useState,useRef,useEffect} from "react";
import axios from "axios";
import moment from "moment";


function App() {

  const [city,setCity]=useState('')
  const [country,setCountry]=useState('')
  const [currentWeather,setcurrentWeather]=useState('')
  const [temperature,setTemperature]=useState('')
  const [error,setError]=useState('')
  let input=''
  

  const inputElement =useRef()

  let intialWeather=(lat,long)=>{
    console.log('initial weather...')
  const options = {
  method: 'GET',
  url: 'https://yahoo-weather5.p.rapidapi.com/weather',
  params: {lat: lat, long: long, format: 'json', u: 'f'},
  headers: {
    'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
    'X-RapidAPI-Key': 'dcf404886cmsh8d23e88c3f29150p166937jsn55a7d92fd3ab'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
    setError('')
   fToC(response.data.current_observation.condition.temperature)
    setcurrentWeather(response.data.current_observation.condition.text)
    setCity(response.data.location.city)
    setCountry(response.data.location.country)
}).catch(function (error) {
	console.error(error);
  setError('Unable to fetch weather information.')
});


  }
  let getWeather=()=>{
    
    
    console.log('getweahter function.....')
    
  input=inputElement.current.value
  console.log('input',input)
  
  const options = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    params: {location: input, format: 'json', u: 'f'},
    headers: {
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
      'X-RapidAPI-Key': 'dcf404886cmsh8d23e88c3f29150p166937jsn55a7d92fd3ab'
    }
  };
  
  axios.request(options).then(function (response) {
    setError('')
    fToC(response.data.current_observation.condition.temperature)
    console.log(response.data);
    console.log(response.data.location.city)
    console.log(response.data.location.country)
    console.log(response.data.current_observation.condition.text)
    setcurrentWeather(response.data.current_observation.condition.text)
    setCity(response.data.location.city)
    setCountry(response.data.location.country)

    console.log('city',city)
    console.log('country',country)

  }).catch(function (error) {
    console.error(error);
    console.error(error.response.data.message)
    setCity('')
    setCountry('')
    setTemperature('')
    setcurrentWeather('')
    setError('Unable to fetch weather information.')
    

  });
  }

  function fToC(fahrenheit) 
  {
    var fTemp = fahrenheit;
    var fToCel = Math.ceil((fTemp - 32)   * 5 / 9)
    setTemperature(fToCel)
    var message = fTemp+'\xB0F is ' + fToCel + '\xB0C.'
      console.log(message);
  } 

  useEffect(()=>{
    console.log('useeffect inside')
    console.log('input',input) 
    
    
      console.log('input',input)
    console.log('useeffect executed.....')  
    navigator.geolocation.getCurrentPosition(function(position){
      console.log('Lat',position.coords.latitude)
      console.log('Long',position.coords.longitude)
      intialWeather(position.coords.latitude,position.coords.longitude)
    })
  },[])

  return (
    <div className={(temperature >16) ? 'app':'app warm'}> 
    <main>
      <div className="search-box">
        <input 
        type="text"
        id="weather"
        className="search-bar"
        placeholder="Search..."
        ref={inputElement}
        />
        <input className="button" type="button"
        
        value="Get Weather"
        onClick={()=>getWeather()}
        
      
        />  
        <div className="location-box">
          <div className="location">
            {city} {country}
          </div>
            <div className="date">
              
                {moment().format('MM/DD/YYYY')}
            </div>
            <div className="weather-box">
              <div className="temp">
              {temperature + '\xB0C'}
              </div>
              <div className="weather">
                {currentWeather}
              </div>
              <div className="error">
                {error}
              </div>
            </div>
          
        </div>
      </div>
    </main>
    </div>
  );
}

export default App;