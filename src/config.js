const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://kali:kali123@kaliyappan.8uabkqs.mongodb.net/");

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