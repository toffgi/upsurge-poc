import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import SelectCity from './components/SelectCity'
import AirQualityContainer from './containers/AirQualityContainer'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#35a5b7',
    },
    secondary: {
      main: '#00838f',
    },
  },
});

// alternative: use geocoding api to get lat and lon (not built in api)
const demoCities = [
  { 
    "name": "Belfast", 
    "coord": { "lat": 54.597, "lon": -5.93 }
  },
  {
    "name": "Breda", 
    "coord": { "lat": 51.592, "lon": 4.77 }
  }, 
  {
    "name": "Budapest", 
    "coord": { "lat": 47.508, "lon": 19.04 }
  }, 
  {
    "name": "Katowice", 
    "coord": { "lat": 50.259, "lon": 19.02 }
  }, 
  {
    "name": "Maribor", 
    "coord": { "lat": 46.554, "lon": 15.64 }
  },
];

function App() {
  const [coord, setCoord] = useState(demoCities[0].coord);

  function handleChange(e) {
      setCoord(e.target.value);
    }
  
  return (
    <ThemeProvider theme={theme}>
      <SelectCity list={demoCities} onClick={handleChange} />
      <Container maxWidth="lg">
        <AirQualityContainer coord={coord} />
      </Container>
    </ThemeProvider>
  )
}

export default App
