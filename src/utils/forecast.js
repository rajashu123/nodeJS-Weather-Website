const request = require('request')
const forecast = (lat, long, callback) =>{

    latitude = encodeURIComponent(lat)
    longitude = encodeURIComponent(long)
    
    var url ='https://api.darksky.net/forecast/22f5681108c86096bee5cc37b398494b/'+latitude + ',' + longitude +'?lang=en&units=si';
    request({uri:url, json : true},(error,response) =>{
        if(error){
            callback('Unable to connect to weather services, please check your network connection and firewall', undefined)
            
        } else if(response.body.error){
            callback(response.body.error, undefined)
        } else {
            callback(undefined , {
                curr_temp: response.body.currently.temperature,
                curr_rain : response.body.currently.precipProbability,
                summary : response.body.daily.data[0].summary,
                forcast : "Currently  temparature in celsius is " + response.body.currently.temperature + ". Also the probability of rain is  "  + response.body.currently.precipProbability

            });
        }
    })
}

module.exports = forecast