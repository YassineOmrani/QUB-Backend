var {mongoose} = require('../db/mongoose');
var {wtags} = require('../models/weather-tags');

module.exports = (req, res, next) => {
    req.TGD = [];
    loop = 0;
    words = req.body.query.split(" ");
    console.log(words);
    words.forEach((word) => {
        wtags.findOne({value: word} , function(err, result){
            req.TGD.push(result);
            loop++;
            if(loop === words.length) {
                next();
            }
        });
    });
};