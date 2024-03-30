const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
// convert data into json format
app.use(express.json());
// static file
app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));


// use Ejs as the view engine
app.set('view engine', 'ejs');

app.get("/", (req,res) => {
    res.render("login");
});
app.get("/signup", (req,res) => {
    res.render("signup");
});

// register user

app.post("/signup", async (req, res) =>{
    const data = {
        username : req.body.username,
        password: req.body.password
    }

    // check if the user already exists in the database
    const existingUser = await collection.findOne({username: data.username});
    if(existingUser) {
        res.send ("user already exists. please choose a different username.");
    }else {
        // hash the password using bcrypt
        const saltRounds =10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
    console.log(userdata);
    }

    // login user
app.post("/login", async (req,res) => {
    try {
        const check = await collection.findOne({name : req.body.username});
        if(!check) {
            res.send("username connot found");
        }

        // compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch) {
            res.render("home");
        }else {
            req.send("wrong password");
        }
    
    }catch{
        res.send("wrong details");
    }
})
   

})
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})
