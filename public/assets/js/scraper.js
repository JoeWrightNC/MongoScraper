// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    /* $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>"); */
    $("#dropOne").append(
      `
      <figure class="effect-artist">
        <img src="${data[i].image}" alt="image not found"/>
        <figcaption>
            <!-- NAME -->
            <h2>${data[i].artist}</h2>
            <!-- DETAILS -->
            <p>${data[i].album} 
            </p>
            <!--VIEW MORE LINK -->
            <a href="#artist-section/artist${i}"><span class="artist-name">${data[i].artist}</span> </a>
        </figcaption>
      </figure>
      `
    )
    $("#dropTwo").append(
      `
      <div class="l-slide  artist-slide artist${i}" data-anchor="artist${i}">
        <ul id="artist-profile-${i}" class="scene unselectable artist-profile" data-friction-x="0.1" data-friction-y="0.1" data-scalar-x="25" data-scalar-y="15" data-mode="cursor">
            <li   class="layer" data-depth="0.10">
              <div id="artist-${i}" class="artist-image"></div>
            </li>
            <li>
              <div class="bg_pattern11"></div>
            </li>
            <li class="layer" data-depth="0.20">
              <h2 class="artist-title">${data[i].album}</h2>
              <h3 class="artist-title">${data[i].artist}</h3>
            </li>
            <li class="layer" data-depth="0.20">
              <p class="title_content2">
                <span>To Read The Review, click 
                  <a href="${data[i].link}">Here</a>
                </span>
              </p>
            </li>
        </ul>
        <p class="artist-slide-prev"> PREV
        </p>
        <p class="artist-slide-next"> NEXT
        </p>
      </div>
      `
    )
  }
});

/* 
// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
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
});
 */