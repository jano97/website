const express = require("express");
const app = express();
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");
const Message = require("./models/message");

//appError
const appError = require("./appError");

//Setting up EJS and BSON
app.use(express.static("assets"));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

app.set("views", path.join(__dirname, "views"));
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
app.get(("/"), (req, res) => {
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
app.get("/messages", async (req, res) => {
        const messages = await Message.find({})
        console.log(messages);
        res.render("messages/index", { messages });
})

app.get("/messages/:id", async (req, res, next) => {
    const { id } = req.params;
    const message = await Message.findById(id);
    if(!message){
        return next(new appError("Error 404: Message not found", 404));
    }
    console.log(message);
    res.render("messages/show", { message })
})

//Contact page and getting messages
app.get(("/contact"), (req, res) => {
    console.log("CONTACT");
    res.render("contact");
})
app.post(("/messages"), async (req, res, next) => {
    try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    console.log(newMessage);
    res.redirect(`/messages/${newMessage._id}`);
} catch(e) {
    next(e);
}
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

//ERROR HANDLER
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!"} = err;
    res.status(status).send(message);
})
//The 404 Route
app.get("*", (req, res) => {
    res.status(404).send("Error 404: Page not found!!");
    console.log("Error 404");
  });

//Server
app.listen(3000, () => {
    console.log("APP IS RUNNING ON PORT: 3000");
})