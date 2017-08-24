const mongoose = require('mongoose');
const validator = require('validator');

var wresponsesSchema = new mongoose.Schema ({
    weather: {
        type: String,
        required: true
    }, time: {
        type: String,
        required: true
    }, qtype: {
        type: String,
        required: true
    }, location: {
        type: String,
        required: true
    }, response: {
        type: String,
        required: true,
        minlength: 1
    }
});

// schema methods and static methods here

var wresponses = mongoose.model('wresponses', wresponsesSchema);

module.exports = {
    wresponses
};