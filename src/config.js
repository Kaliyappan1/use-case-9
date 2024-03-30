const mongoose = require("mongoose");
require('dotenv').config()
const connect = mongoose.connect(process.env.URI);

// check database connected or not
connect.then(() => {
    console.log("database connected successfully");
})
.catch(() => {
    console.log("database cannot be connected");
});

// create a schema

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

//collection Part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;