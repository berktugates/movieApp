const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const appRoutes = require("./routes/appRoutes");
const adminRoutes = require("./routes/adminRoutes");

// ejs template engine for dynamic html pages
app.set("view engine", "ejs") 
// node_modules file is global
app.use(express.static(path.join(__dirname,"node_modules")));
// for static file
app.use(express.static(path.join(__dirname, "public")));

// for db post method values json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// for app routes
app.use(adminRoutes);
app.use(appRoutes);


// for server starting
app.listen(3000,function(){
    console.log("Sunucu çalışıyor.")
})