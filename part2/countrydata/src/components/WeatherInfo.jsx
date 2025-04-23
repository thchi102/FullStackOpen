const WeatherInfo = ({temp, wind, iconId, capital}) => {
    const iconURL = `https://openweathermap.org/img/wn/${iconId}@2x.png`
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <div>Temperature: {temp} Celsius</div>
            <img src={iconURL} style={{ width: '200px', height: 'auto' }}/>
            <div>Wind: {wind} m/s</div>
        </div>
    )
}

export default WeatherInfo