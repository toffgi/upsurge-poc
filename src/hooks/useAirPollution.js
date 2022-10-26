import { useState, useEffect } from 'react'

function useAirPollution(lat, lon) {
  const [airPollution, setAirPollution] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchAirPollution = async () => {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`
      )
      setIsLoading(true) 
      res
        .json()
        .then(res => {
          setAirPollution(res)
          setIsLoading(false)
          
          console.log(res)
        })
        .catch(err => {
          setIsError(true)
          throw err
        }) 
    }

    fetchAirPollution()
  }, [lat, lon])

  return { airPollution, isLoading, isError }
}

export default useAirPollution
