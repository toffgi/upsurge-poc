import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  content: {
    height: 75,
    [theme.breakpoints.down('sm')]: {
      height: 75
    }
  },
  text: {
    marginBottom: 8,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem'
    }
  },
  aqiValue: {
    fontSize: '1.7rem',
  },
  info: {
    display: 'flex',
    alignItems: 'center'
  },
}))

const colorFormatting = ({aqi}) => {
  return (
    aqi === 1 ? '#2dc937' :
    aqi === 2 ? '#99c140' :
    aqi === 3 ? '#e7b416' :
    aqi === 4 ? '#db7b2b' :
    '#cc3232'
  );   
}


const CurrentAirQuality = ({aqi, unixdate}) => {
  const classes = useStyles()
  const date = new Date(unixdate * 1000)
  const formattedDateTime = date.toLocaleString('en-US', {
                            weekday: "long", month: "long", day:"numeric", year:"numeric", 
                            hour: 'numeric', minute: 'numeric', hour12: true 
                            })   
  return (
    <Card>
      <CardContent className={`${classes.content}`}>
        <Typography 
        className={`${classes.text} ${classes.info}`} 
        variant="h5" 
        component="h5"
        >
          Current Air Quality Index [{formattedDateTime}]
        </Typography>
        <Typography
          className={`${classes.text} ${classes.info}`}
          variant="h3"
          component="h3"
          style={{color: colorFormatting({aqi})}}
        >
          {aqi ===1 ? (
            <Typography className={classes.aqiValue}> {aqi} (Good) </Typography> 
          ) : aqi === 2 ? (
            <Typography className={classes.aqiValue}> {aqi} (Fair) </Typography>
          ) : aqi === 3 ? (
            <Typography className={classes.aqiValue}> {aqi} (Moderate) </Typography>
          ) : aqi === 4 ? (
            <Typography className={classes.aqiValue}> {aqi} (Poor) </Typography>
          ) : (
            <Typography className={classes.aqiValue}> {aqi} (Very Poor) </Typography>
          )}
        </Typography>
      </CardContent>
    </Card>
  )
}
  
CurrentAirQuality.propTypes = {
  aqi: PropTypes.number.isRequired,
}

export default CurrentAirQuality