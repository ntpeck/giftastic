

var presidents = ["Washington", "Adams", "Jefferson"];


 function displayPresidentsInfo() {
    console.log("Hi!!");
    var presidentInput = $(this).attr("presidents-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mIkB6cTpJY5QchozFy6U1trRUrDBhesX&q=" + presidentInput + "&limit=10&offset=0&rating=pg-13&lang=en";
    

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (result) {
        console.log(result);

    for (var i = 0; i < result.data.length; i++) {
        var animated = result.data[i].images.fixed_height.url
        console.log("Animated:", animated)
        var still = result.data[i].images.fixed_height_still.url
            console.log("still", still)

                var newDiv = $("<div id='gif'>");
                var p = $("<p>").text("Rating: " + result.data[i].rating);
                var presidentsImage = $("<img>");
                presidentsImage.addClass("resultGif");
                presidentsImage.attr("src", still);
                presidentsImage.attr("data-state", "still");
                presidentsImage.attr("data-still", still);
                presidentsImage.attr("data-animate", animated);
                newDiv.append(p);
                newDiv.prepend(presidentsImage);
                $("#presidents-view").prepend(newDiv);

            };
        });
    };
function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < presidents.length; i++) {

        var a = $("<button>");
        a.addClass("presidents-button");
        a.attr("presidents-name" , presidents[i]);
        a.text(presidents[i]);
        $("#buttons-view").append(a);
    };

};

$("#add-presidents").on("click", function (event) {
    event.preventDefault();
    var addlPresident = $("#presidents-input").val().trim();
    presidents.push(addlPresident);
    renderButtons();
    $("#presidents-input").val("");
});

$(document).on("click", ".presidents-button", displayPresidentsInfo);

function playGifs() {
    var state = $(this).attr("data-state");
   if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "data-animate");
   } else  {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
   };
};

renderButtons();

$(document).on("click", ".resultGif", playGifs);
