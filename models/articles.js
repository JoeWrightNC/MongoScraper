var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
    /* validate: [
      // Function takes in the new `longstring` value to be saved as an argument
      function(input) {
        // If this returns true, proceed. If not, return the error message below
        checkDups(input)
      },
      // Error Message
      "Longstring should be longer."
    ] */
  },
  summary: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  comments: [
    {
    type: Schema.Types.ObjectId,
    ref: "comments"
    }
  ]
});

/* function checkDups(title) {
  articles.find( { title:title })
  .then(function(checkerResult){
    if (checkerResult) {
      console.log(checkerResult)
      return false
    }
    else {
      console.log(checkerResult)
      return true
    }
  })
} */

// This creates our model from the above schema, using mongoose's model method
const articles = mongoose.model("articles", ArticleSchema);

// Export the Article model
module.exports = articles;
