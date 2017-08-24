const mongoose = require('mongoose');
const validator = require('validator');

var utagsSchema = new mongoose.Schema ({
    value: {
        type: String,
        required: true,
        minlength: 1
    }
});

// schema methods and static methods here

var utags = mongoose.model('utags', utagsSchema);

module.exports = {
    utags
};