var {mongoose} = require('../db/mongoose');
var {wresponses} = require('../models/weather-responses');
const request = require('request');

module.exports = (req, res, next) => {
    locArray = [];
    req.TGD.filter((word) => {
        if(word !== null){
            if(word.tag === "LOC"){
                locArray.push(word.value);
            }
        }
    });
    if(locArray.length === 0) {
        location = "north%20nazimabad";
    } else {
        location = locArray.join("%20");
    }
    request({url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAEBR9PxDVvnD1eZ9ZwI_jJrgEexRU3qZQ&address=${location}`, json: true}, (error, response, body) => {
        if (error) {
            req.ans = 'is waqt mosam ka haal maloom nahi kia ja sakta.';
            next();
        } else if (body.status === 'ZERO_RESULTS') {
            req.ans = 'is jagah ke lye mosam ka haal maloom nahi kia ja sakta.';
            next();
        } else if (body.status === 'OK') {
            lat = body.results[0].geometry.location.lat;
            lng = body.results[0].geometry.location.lng;            
            request({url: `https://api.darksky.net/forecast/bfe0f320e90979331161f06550b79379/${lat},${lng}`, json: true}, (error, response, body) => {
                if(!error && response.statusCode === 200){
                    var weather = null;
                    var qtype = null;
                    var time = null;
                    req.TGD.filter((word) => {
                        if(word !== null){
                            if(word.tag === "WTH"){
                                weather = word.value;
                            } else if(word.tag === "?") {
                                qtype = word.value;
                            } else if(word.tag === "TIME") {
                                time = word.value;
                            }
                        }
                    });
                    if(location === "north%20nazimabad"){
                        location = "current";
                    } else {
                        location = "other";
                    }
                    console.log({weather, time, qtype, location});
                    wresponses.findOne({weather, time, qtype, location}, function(err, result) {
                        console.log(result);
                        if (result) {
                            result.response = result.response.replace("_TEMP_C", f2c(body.currently.temperature));
                            result.response = result.response.replace("_ApTEMP_C", f2c(body.currently.apparentTemperature));
                            result.response = result.response.replace("_TEMP_T", f2c((body.daily.data[0].temperatureMin + body.daily.data[0].temperatureMax)/2));
                            result.response = result.response.replace("_MinTEMP_T", f2c(body.daily.data[0].temperatureMin));
                            result.response = result.response.replace("_MaxTEMP_T", f2c(body.daily.data[0].temperatureMax));
                            result.response = result.response.replace("_ApTEMP_T",f2c((body.daily.data[0].apparentTemperatureMin + body.daily.data[0].apparentTemperatureMax)/2));
                            result.response = result.response.replace("_RAINQ_C", rainFinder(body.currently.icon));
                            result.response = result.response.replace("_RAINQ_T", rainFinder(body.daily.data[0].icon));
                            result.response = result.response.replace("_RAINC_C", rainFinder(body.currently.precipProbability));
                            result.response = result.response.replace("_RAINC_T", rainFinder(body.daily.data[0].precipProbability));
                            req.ans = result.response;
                            next();
                        } else {
                            req.ans = "me aap ki baat samajh nahi saka.";
                            next();
                        }
                    });
                }
                else {
                    req.ans = 'is waqt mosam ka haal maloom nahi kia ja sakta.';
                    next();
                }
            });
        }
    })
}

rainFinder = function(value) {
    if(typeof value === 'number'){
        if(value > 0.5) {
            return '';
        } else {
            return 'nahi';
        }
    } else if(value === 'rain') {
        return 'haan';
    } else {
        return 'nahi';
    }
}

f2c = (v) => (((v-32)*5)/9).toFixed(2);