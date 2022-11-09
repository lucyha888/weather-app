import './App.css';
import { useState, useEffect } from 'react'

const BASE_URL = "https://openweathermap.org/data/2.5/find"
const API_KEY = "439d4b804bc8187953eb36d2a8c26a02"

function App() {
  const [value, setValue] = useState("")
  const [result, setResult] = useState("")
  const [description, setDescription] = useState("")
  const [isCall, setIsCall] = useState(false)
  const [error, setError] = useState("")
  useEffect(() => {
    if (!value) return;
    const fetchTemperature = async () => {
      try {
        const response = await fetch(`${BASE_URL}?q=${value}&appid=${API_KEY}`)
        const data = await response.json()
        setResult(data.list[0]?.main?.temp)
        setDescription(data.list[0]?.weather[0]?.description)
        if (data.list.length === 0) {
          setError("Data Not Found")
        } else {
          setError("")
        }
      } catch(error){
        console.log(error)
      }
    
    }
    fetchTemperature()
    setIsCall(false)
    // eslint-disable-next-line 
  }, [isCall])
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsCall(true)
  }
  return (
    <div className="App">
      <h2>Weather app</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Please input the city' value={value} onChange={e => setValue(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {error ?<p style={{color:"red"}}>{error}</p> :<p>Temperature of {value}: {result}, description: {description}</p> }
      
    </div>
    
  );
}

export default App;
