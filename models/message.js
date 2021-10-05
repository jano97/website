const mongoose = require("mongoose");
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 2,
        required: true,
        maxlength: 20
    },
    lastName: {
        type: String,
        minlength: 3,
        required: true,
        maxlength: 20
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    subject: {
        type: String,
        minlength: 3,
        required: true,
        maxlength: 20
    },
    message: {
        type: String,
        minlength: 10,
        maxlength: 300,
        required: true
    }
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;