const request = require('request')

const forecast = ( latitude, longitude , callback) => {
    const url = 'https://api.darksky.net/forecast/78f108f1ab2ef160fc15b3cc51cbf90f/' + latitude + ',' + longitude
  
    request({ url, json: true }, (error, {body}) => {
      if(error){
        callback('Unable to connect to weather service', undefined)
      }else if(body.error ) {
        callback('Unable to find location', undefined)
      }
      else{
          callback(undefined ,body.daily.data[0].summary + ' It is currently  ' + body.currently.temperature + ' farenheight outer. There is a ' + body.currently.precipProbability + '% of rain')
      }
      
    })
}

module.exports = forecast


