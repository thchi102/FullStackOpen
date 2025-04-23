import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Display from './components/Display'
import countryService from './services/countryService'

function App() {
  const [count, setCount] = useState(0)
  const [countryNames, setcountryNames] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchResult, setSearchResult] = useState([])

  useEffect(()=>{
    countryService.getCountries()
    .then(
      returned => {
        const nameList = []
        returned.map(c => nameList.push(c.name.common))
        setcountryNames(nameList)
      }
    )
  },[])

  const handleSearchName = (event) => {
      setSearchName(event.target.value)
      setSearchResult(countryNames.filter(c => c.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <form>
        Find country: <input type="text" value={searchName} onChange={handleSearchName}></input>
      </form>
      <Display searchResult={searchResult}/>
    </div>
  )
}

export default App
