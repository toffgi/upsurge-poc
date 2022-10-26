import React, { useEffect } from 'react'
import Chart from 'chart.js'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.up('md')]: {
      height: 300
    }
  },
  title: {
    marginBottom: 10
  },
  canvas: {
    maxWidth: '100%'
  }
}))

const CurrentAirComponents = ({ components }) => {
  const classes = useStyles()
  let chartCanvas

  useEffect(() => {
    const setChart = () => {
      return new Chart(chartCanvas, {
        type: 'bar',
        options: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Pollutant concentration in μg/m3'
          },
          responsive: true,
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  suggestedMax: 500,
                  suggestedMin: 0
                },
                gridLines: {
                  display: false
                }
              }
            ],
            xAxes: [
              {
                stacked: true,
                gridLines: {
                  display: false
                }
              }
            ]
          }
        },
        data: {
          labels: Object.keys(components),
          datasets: [
            {
              label: '',
              data: Object.values(components),
              backgroundColor: '#35a5b7'
            },
            // {
            //   label: '',
            //   data: Object.values(forecast.temp),
            //   backgroundColor: '#fac76c'
            // }
          ]
        }
      })
    }

    setChart()
  }, [chartCanvas, components])

  return (
    <Card>
      <CardContent className={classes.container}>
        <Typography className={classes.title} variant="h5" component="h2">
          Current Air Pollutants 
        </Typography>
        <canvas className={classes.canvas} ref={node => (chartCanvas = node)} />
      </CardContent>
    </Card>
  )
}

CurrentAirComponents.propTypes = {
  components: PropTypes.object
}

export default CurrentAirComponents
