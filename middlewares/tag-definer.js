var {mongoose} = require('../db/mongoose');
var {tags} = require('../models/tags');
var {utags} = require('../models/undefined-tags');
var _ = require('lodash');

module.exports = (req, res, next) => {
    req.WC = false ;
    req.CC = false ;
    req.TGD = [];
    loop = 0;
    req.words = req.body.query.split(" ");
    console.log(req.words);
    req.words.forEach((word) => {
        tags.findOne({value : word} , function(err, result){
            if(!result) {          
                let cache = new utags({value: word});
                cache.save((err) => {});
            }
            req.TGD.push(result);
            loop++;
            if(loop === req.words.length) {
                var KWCount = 0;
                var NKWCount = 0;
                var typesArray = _.map(req.TGD, 'Ktype');
                for(var val of typesArray) {
                   if(typeof val !== "undefined") {
                       if(val === "K") {
                           KWCount++;
                       } else if(val === "N") {
                           NKWCount++;
                       }
                   }
                }
                var defCount = KWCount + NKWCount;
                CL = defCount/req.words.length;
                if(CL > 0.75) {
                    console.log(`confidence level is: ${CL} proceeding further...`);
                    req.CC = true;
                } else {
                    console.log(`confidence level is: ${CL} not good enough ! terminating further process with default response...`);
                    req.ans = "me aap ki baat theek se samajh nahi paya.";
                }
                next();
            }
        });
    });
};
