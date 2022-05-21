import React,{useState,useRef} from "react";
import axios from "axios";
import moment from "moment";


function App() {

  const [city,setCity]=useState('')
  const [country,setCountry]=useState('')
  const [currentWeather,setcurrentWeather]=useState('')
  const [temperature,setTemperature]=useState('')
  const [error,setError]=useState('')

  const inputElement =useRef()


  let getWeather=()=>{
    console.log('getweahter function.....')
  const input=inputElement.current.value
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
    setError(error.response.data.message)

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
        // onChange={(e,evt)=>{getWeather(e.target.value,evt)}}
        // onKeyDown={(e,evt)=>{getWeather(e.target.value,evt)}}
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