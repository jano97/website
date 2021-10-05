const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const Message = require("./models/message");

//Setting up EJS and BSON
app.use(express.static("assets"));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//Connecting mongoose
mongoose.connect("mongodb://localhost:27017/message", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Mongo connection is open");
})
.catch(err => {
    console.log("Mongo connection error: ");
    console.log(err);
})

//English website
app.get((""), (req, res) => {
    console.log("Home page");
    res.render("index");
})

app.get(("/index"), (req, res) => {
    console.log("Home page");
    res.render("index");
})

app.get(("/works"), (req, res) => {
    console.log("WORKS");
    res.render("works");
})

app.get(("/branding"), (req, res) => {
    console.log("BRANDING");
    res.render("branding");
})

app.get(("/faq"), (req, res) => {
    console.log("Frequantly Asked Questions");
    res.render("faq");
})
//Creating a page to list all the messages=====================================
app.get(("/messages"), async (req, res) => {
    const {message} = req.query;
    if(message) {
        const messages = await Message.find({});
        res.render("messages/index", {name, message});
    } else {
        const messages = await Message.find({});
        res.render("messages/index", {message: "All"});
    }
})
//Contact page and getting messages
app.get(("/contact"), (req, res) => {
    console.log("CONTACT");
    res.render("contact");
})
app.post(("/messages/index"), async (req, res) => {
    const newMessage = new Message(req.body);
    await newMessage.save();
    console.log("New Message!");
    res.redirect("/contact");
})

app.get(("/register"), (req, res) => {
    console.log("REGISTER");
    res.render("register");
})

//French website
app.get(("/frindex"), (req, res) => {
    console.log("French Home");
    res.render("frindex");
})

app.get(("/frworks"), (req, res) => {
    console.log("French Works");
    res.render("frworks");
})

app.get(("/frbranding"), (req, res) => {
    console.log("French Branding");
    res.render("frbranding");
})

app.get(("/frfaq"), (req, res) => {
    console.log("French FAQ");
    res.render("frfaq");
})

app.get(("/frcontact"), (req, res) => {
    console.log("French Contact");
    res.render("frcontact");
})

app.get(("/frregister"), (req, res) => {
    console.log("French Register");
    res.render("frregister");
})

//Server
app.listen(3000, () => {
    console.log("APP IS RUNNING ON PORT: 3000");
})