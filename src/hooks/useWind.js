import { useState, useEffect } from 'react'

function useWind() {
  const [wind, setWind] = useState('')
  const [isWindLoading, setIsWindLoading] = useState(true)
  const [isWindError, setIsWindError] = useState(false)

  useEffect(() => {
    const fetchWind = async () => {
      const res = await fetch(
        // `https://maps.sensor.community/data/v1/wind.json` 
        // `src/data/wind-global.json` // for local testing
        `https://raw.githubusercontent.com/onaci/leaflet-velocity/master/demo/wind-global.json`
      )
      setIsWindLoading(true) 
      res
        .json()
        .then(res => {
          setWind(res)
          setIsWindLoading(false)
          
          console.log(res)
        })
        .catch(err => {
          setIsWindError(true)
          throw err
        }) 
    }

    fetchWind()
  }, [])

  return { wind, isWindLoading, isWindError }
}

export default useWind
