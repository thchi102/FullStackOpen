import axios from 'axios'

const allURL = "https://studies.cs.helsinki.fi/restcountries/api/all"
const countryURL = "https://studies.cs.helsinki.fi/restcountries/api/name"
const weatherURL = "https://api.openweathermap.org/data/3.0/onecall?"
const api_key = import.meta.env.VITE_SOME_KEY

const getCountries = () =>{
    const promise = axios.get(allURL)
    return promise.then(response => response.data)
}

const getCountryInfo = (country) => {
    const promise = axios.get(`${countryURL}/${country.toLowerCase()}`)
    return promise.then(response => response.data)
}

const getWeatherInfo = (lat, lon) => {
    const promise = axios.get(`${weatherURL}lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
    return promise.then(response => response.data)
} 
export default {getCountries, getCountryInfo, getWeatherInfo}