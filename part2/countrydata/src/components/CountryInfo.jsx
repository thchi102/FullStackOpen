const CountryInfo = ({country, capital, area, languages, flag}) => {
    return (
        <div>
            <h1>{country}</h1>
            <div>Capital: {capital}</div>
            <div>Area: {area}</div>
            <h2>Languages</h2>
            <ul>
                {languages.map(l => <li key={l}>{l}</li>)}
            </ul>   
            <img src={flag} style={{ width: '200px', height: 'auto' }}/>
        </div>
    )
}

export default CountryInfo