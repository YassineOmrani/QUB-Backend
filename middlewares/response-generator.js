var {mongoose} = require('../db/mongoose');
var {responses} = require('../models/responses');

module.exports = (req, res, next) => {
    if(req.WC) {
        next();
    } else if(req.CC) {
        responses.find({tags: {"$in": req.words}}, function(err, result){
            if(result.length > 0) {
                var score = new Array(result.length).fill(0), a = 0;
                while ( a < result.length) {
                    result[a].tags.forEach(function(tag){
                        req.words.forEach(function(word){
                            if(tag === word) {
                                score[a]++;
                            }
                        });
                    });
                    a++;
                }
                console.log(score);
                req.ans = result[indexofMax(score)].response;
                console.log(req.ans);
                next();
            }
            else {
                req.ans = "me aap ki baat samajh nahi saka.";
                next();
            }
        });
    } else {
        next();
    }
}

indexofMax = (arr) => {
    var max = arr[0], maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}