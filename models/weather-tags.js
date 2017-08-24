const mongoose = require('mongoose');
const validator = require('validator');

var wtagsSchema = new mongoose.Schema ({
    value: {
        type: String,
        required: true,
        minlength: 1
    },
    tag: {
        type: String,
        required: true,
        minlength: 1
    }
});

// schema methods and static methods here

var wtags = mongoose.model('Wtags', wtagsSchema);

module.exports = {
    wtags
};