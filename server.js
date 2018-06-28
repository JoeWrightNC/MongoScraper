const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");


// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server

// Require all models
const db = require("./models");
const PORT = process.env.PORT || 8080;

// Initialize Express
const app = express();

////////////////////////////////
//// Configure middleware //////
////////////////////////////////
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

db.articles.remove({})

require("./routes/appRoutes.js")(app);

app.get('/', function(req, res) {
	res.render('index'); 
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
