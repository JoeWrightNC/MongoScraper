// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  console.log("woohoo")
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      `
      <div class="card">
      <div class="row ">
        <div class="col-md-8 px-3">
          <div class="card-block px-6">
            <h4 class="card-title">${data[i].title} </h4>
            <p class="card-text">
              ${data[i].summary}
            </p>
            <br>
            <a href="${data[i].link}" target="_blank" class="mt-auto btn btn-lg btn-primary">Read More</a>
            <button type="button" class="btn btn-lg btn-primary noteTaker" data-id="${data[i]._id}">Leave A Comment</button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="carousel-item active">
            <img class="d-block" src="${data[i].image ? data[i].image : '../images/raleighHeader.jpg'}" alt="image not found">
          </div>
        </div>
      </div>
    </div>
      `
    )
  }
});


$(document).on("click", "#scrapeEm", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .then(function() {
    console.log("scrapedEm")
    location.reload()
  })
})
// Whenever someone clicks a p tag
$(document).on("click", ".noteTaker", function() {

  // Empty the notes from the note section
  $("#notes").empty();
  $("#articles").hide();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      $("#notes").append(
        `
        <h2 class="noteTitle">${data.title}</h2>
        <p class="noteSummary">${data.summary}</p>
        <h4>Subject</h4>
        <input class="commentInputs" id='titleinput' name='title'/>
        <h4>Comment</h4>
        <textarea class="commentInputs" rows=4 id='bodyinput' name='body'></textarea>"
        <br>
        <button data-id="${data._id}" class="mt-auto btn btn-primary" id='savenote'>Save Note</button>
        <br>
        <h4>OR</h4>
        <a href="/" class="mt-auto btn btn-primary">Return To Articles</a>
        <br>
        <h2 class="noteTitle">Previous Comments</h2>
        ${data.comments.map((item, i) => `
          <h3>Subject: ${item.title}</h3>
          <p class=commentBody>${item.body}</p>
          <button data-id="${item._id}" class="mt-auto btn btn-primary" id='deletenote'>Delete Note</button>
          `.trim()).join('')}
        `
      ) 


      // If there's a note in the article
      if (data.articles) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.comments.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.comments.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $("#articles").show();
});

$(document).on("click", "#deletenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/delete/" + thisId,
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $("#articles").show();
});
