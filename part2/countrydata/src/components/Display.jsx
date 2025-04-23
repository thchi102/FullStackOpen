import { useEffect, useState } from 'react';
import countryService from '../services/countryService';
import CountryInfo from './CountryInfo';
import WeatherInfo from './WeatherInfo';

const Display = ({searchResult}) => {
    const [searchName, setSearchName] = useState('')
    const [capital, setCapital] = useState('')
    const [area, setArea] = useState('')
    const [languages, setLanguages] = useState([])
    const [flag, setFlag] = useState(null)
    const [coordinate, setCoordinate] = useState([])
    const [weather, setWeather] = useState({})

    useEffect(() => {
        if(searchName === ''){
            return
        }
        countryService.getCountryInfo(searchName)
        .then(
            returned => {
                setArea(returned.area)
                setCapital(returned.capital[0])
                const lans = []
                for (const [key, value] of Object.entries(returned.languages)) {
                    lans.push(value)
                }
                setLanguages(lans)
                setFlag(returned.flags.png)
                setCoordinate(returned.capitalInfo.latlng)
            }
        )
    }, [searchName])

    useEffect(()=>{
        if(coordinate.length === 0){
            return
        }
        countryService.getWeatherInfo(coordinate[0], coordinate[1])
        .then(
            returned => {
                const weatherInfo = {
                    temperature: returned.current.temp,
                    wind: returned.current.wind_speed,
                    iconId: returned.current.weather[0].icon
                }
                setWeather(weatherInfo)
            }
        )
    },[coordinate])


    useEffect(() => {
        if (searchResult.length === 1) {
          setSearchName(searchResult[0]);
        }
      }, [searchResult])

    if(searchResult.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if(1 < searchResult.length &&  searchResult.length <= 10){
        if(searchName === ''){
            return (
                <>
                {searchResult.map(
                    c => <div key={c}>{c} <button onClick={() => setSearchName(c)}>Show</button></div>
                )}
                </>
            )
        }
        else{
            return (
                <>
                <CountryInfo country={searchName} capital={capital} area={area} languages={languages} flag={flag}/>
                <WeatherInfo temp={weather.temperature} wind={weather.wind} iconId={weather.iconId} capital={capital}/>
                {console.log(weather)}
                </>
            )
        }
    }
    else if(searchResult.length === 1){
        return (
            <>
            <CountryInfo country={searchName} capital={capital} area={area} languages={languages} flag={flag}/>
            <WeatherInfo temp={weather.temperature} wind={weather.wind} iconId={weather.iconId} capital={capital}/>
            </>
        )
    }
}

export default Display