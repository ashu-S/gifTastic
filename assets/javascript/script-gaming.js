/*---------------------------------------------------------------------------------------------*/
/* Style sheet for the gifTastic webpage project using javascript,jquery using AJAX API calls  */
/* Theme for gifTastic webpage -                                                               */
/* Author - Ashwini                                  										   */
/*---------------------------------------------------------------------------------------------*/

$(document).ready(function(){

var games = ["Super Mario", "8Bit", "Mortal Kombat", "Super Nintendo", "Game Boy", "Bioshock Infinite", "Call of Duty", "Kirby"];

$("#gifsView").hide();

// creates buttons for each of these
function makeButtons(){ 
	// deletes the shows prior to adding new shows so there are no repeat buttons
	$('#buttonsView').empty();
	// loops through the shows array
	for (var i = 0; i < games.length; i++){
		// dynamically makes buttons for every show in the array
		var a = $('<button class="btn btn-info">') 
		a.addClass('show'); // add a class
		a.attr('data-name', games[i]); // add a data-attribute
		a.text(games[i]); // make button text
		$('#buttonsView').append(a); // append the button to buttonsView div
	}
}

// handles addShow button event
$("#addShow").on("click", function(){

	// grabs the user show input
	var game = $("#show-input").val().trim();
	// that input is now added to the array
	games.push(game);
	// the makeButtons function is called, which makes buttons for all my shows plus the user show
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
})

// function to display gifs
function displayGifs(){
	$("#gifsView").empty();
	$("#gifsView").show();
	$("#showCategory").html("Gaming");
	var game = $(this).attr("data-name");


	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=80c4ef88fe43460485d6142debc34cf9&q=" + game +"&limit=25&offset=0&rating=PG&lang=en";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var showGif = $('<img>');
					showGif.attr('src', results[i].images.fixed_height_still.url);
					// shows the rating on hover
					showGif.attr('title', "Rating: " + results[i].rating);
					showGif.attr('data-still', results[i].images.fixed_height_still.url);
					showGif.attr('data-state', 'still');
					showGif.addClass('gif');
					showGif.attr('data-animate', results[i].images.fixed_height.url);
				// var rating = results[i].rating;
				// var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(showGif);
				// gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
	console.log(this);
	console.log(state);
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying show gifs
$(document).on("click", ".show", displayGifs);

// initially calls the makeButtons function
makeButtons();


});	 // Document.ready() Function