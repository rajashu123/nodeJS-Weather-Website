const request = require('request')

const geocode = (add ,callback) =>{

var address = encodeURIComponent(add)
const baseurl='https://api.mapbox.com/';
const service='geocoding/v5/mapbox.places/';
const myToken='pk.eyJ1IjoicmFqYXNodSIsImEiOiJjanlteGFsY24waXJsM2dwZTFqb2FvNjExIn0.NmAKJyzGtu2km89-2wZUBg';
const geo_url = baseurl + service + address + '.json?access_token=' + myToken + '&limit=1'

request({uri:geo_url, json: true},(error,response) =>{
    if(error){
            callback('Unable to connect to geolocation services, please check your netwrk connection and firewall', undefined)
    } else if (response.body.features.length === 0 ){
            //console.log("Unable to locate adderess");
            callback('Unable to locate the address', undefined)
    } else{
        
        callback(undefined,{
            'latitude' : response.body.features[0].center[1],
            'longitude' : response.body.features[0].center[0],
            'place_name' : response.body.features[0].place_name
        })
        }
} )
}

module.exports = geocode