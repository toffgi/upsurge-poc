import React from 'react'
import useAirPollution from '../hooks/useAirPollution'
import useWind from '../hooks/useWind'
import Grid from '@material-ui/core/Grid'
import Map from '../components/Map'
import AreaMap from '../components/AreaMap'
import { makeStyles } from '@material-ui/core/styles'
import CurrentAirQuality from '../components/CurrentAirQuality'
import CurrentAirComponents from '../components/CurrentAirComponents'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#e5e5e5',
    borderRadius: '1rem',
    padding: '2rem',
    marginTop: '6rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: '4rem'
    }
  },
  infoText: {
    color: 'white',
    textAlign: 'center'
  }
}))

const AirQualityContainer = ({ coord }) => {
  const { airPollution, isLoading, isError } = useAirPollution(coord.lon, coord.lat)
  const { wind } = useWind()
  const classes = useStyles()

  const AirQuality = () => {
    return (
      <>
        {!isError && coord && airPollution ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CurrentAirQuality aqi={airPollution.list[0].main.aqi} unixdate={airPollution.list[0].dt}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <CurrentAirComponents components={airPollution.list[0].components}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <Map lat={coord.lat} lon={coord.lon} aqi={airPollution.list[0].main.aqi}/>
            </Grid>
            <Grid item xs={12} md={12}>
              <AreaMap lat={coord.lat} lon={coord.lon} data={wind}/>
            </Grid>
          </Grid>
        ) : !coord ? (
          <h4 className={classes.infoText}> Please select a demo city from the list above </h4>
        ) : (
          <h4 className={classes.infoText}> Can't find results </h4>
        )}
      </>
    )
  }

  return (
    <>
      <div className={classes.container}>
        {isLoading ? (
          <h4 className={classes.infoText}>Loading....</h4>
        ) : (
          <AirQuality/>
        )}
      </div>
    </>
  )
}

export default AirQualityContainer
