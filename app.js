const cookieParser = require("cookie-parser");
const express = require("express");
const hbs = require("express-handlebars")
const mongoose = require("mongoose");
const routes = require("./routes");

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')



const {auth} = require("./middlewares/authMiddleware")

const start = async () => {
    try{
        const db = await mongoose.connect("mongodb+srv://ProjectAngular:ZlFGuUtnZ5Sp9jDb@cluster0.f6sfuwx.mongodb.net/?retryWrites=true&w=majority");
        console.log("DB Connected");
    }
    catch(error){
        console.log("Error connecting to the database!")
        return process.exit(1);
    }

    const app = express();

    app.use(express.static('public'))
    app.use(express.urlencoded({extended: false}))
    app.use(cookieParser())
    app.use(express.json());
    app.use(auth)
    app.use(routes)

    app.engine("hbs",hbs.engine({
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        extname: 'hbs'
    }))

    app.set("view engine","hbs")

    app.listen("5000",()=>{console.log("Server is listening On port 5000...")})
}

start();