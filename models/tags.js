const mongoose = require('mongoose');
const validator = require('validator');

var tagsSchema = new mongoose.Schema ({
    value: {
        type: String,
        required: true,
        minlength: 1
    },
    tag: {
        type: String,
        required: true,
        minlength: 1
    },
    Ktype: {
        type: String,
        required: true,
        minlength: 1
    }
});

// schema methods and static methods here

var tags = mongoose.model('tags', tagsSchema);

module.exports = {
    tags
};