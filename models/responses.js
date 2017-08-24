const mongoose = require('mongoose');
const validator = require('validator');

var responsesSchema = new mongoose.Schema ({
    tags: {
        type: [String],
        required: true,
    },
    response: {
        type: String,
        required: true,
        minlength: 1
    }
});

// schema methods and static methods here

var responses = mongoose.model('responses', responsesSchema);

module.exports = {
    responses
};