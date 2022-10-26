import React, { useEffect } from 'react'
import L from 'leaflet'
import { Card, CardContent, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import 'leaflet-velocity'

const useStyles = makeStyles(theme => ({
  container: {
    height: 300,
    [theme.breakpoints.down('sm')]: {
      height: 200
    }
  },
  area_map: {
    width: '100%',
    height: '100%'
  }
}))

const AreaMap = ({ lat, lon, data }) => {
  const classes = useStyles()

  useEffect(() => {
    L.map('area_map', {
      center: [lat, lon],
      zoom: 4,
      scrollWheelZoom: false,
      layers: [
        L.tileLayer(
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
          {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }
        ),
        L.marker([lat, lon]),
        L.velocityLayer({
          displayValues: true,
          displayOptions: {
            velocityType: "Global Wind",
            displayPosition: "bottomleft",
            displayEmptyString: "No wind data"
          },
          data: data,
          velocityScale: 0.008,
          opacity: 0.5,
          colorScale: ["rgb(120,120,255)","rgb(50,50,255)"],
          minVelocity: 0,
          maxVelocity: 10
        })
      ]
    })
      .invalidateSize(true)
      .dragging.disable()
    }, [lat, lon, data])
      
  return (
    <Card>
      <CardContent className={classes.container}>
        <div className={classes.area_map} id="area_map"></div>
      </CardContent>
    </Card>
  )
}

AreaMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired
}

export default AreaMap
