$(document).ready(function(){

  var apiKey = "9084eae9f770e006ebcba95dbd474e28";
  var userQuery;
  var pageNum = 1;

  function getMovies (){

    $("#userInput").val("");
    $("#movieDisplay").empty();

    var queryURL = "https://api.themoviedb.org/3/search/movie/?api_key=" + apiKey + "&page=" + pageNum + "&query=" + userQuery;

    //AJAX call to obtain data
    $.ajax({url: queryURL, method: "GET"})
      .done(function(response){
        var newMovies = response.results;

        //If query shows less than 20 results, remove pagination
        if (response.results.length < 20) {
          $(".pagination").hide();
        } else {
          $(".pagination").show();
        }

        var parsedMovies = newMovies.map(function(movie){
          var title = movie.title;
          var overView = movie.overview;
          var releaseDate = new Date(movie.release_date);
          var formattedReleaseDate = (releaseDate.getMonth() + 1) + "/" + releaseDate.getDate() + "/" + releaseDate.getFullYear();
          var voteAverage = movie.vote_average;
          var poster = "http://image.tmdb.org/t/p/w300" + movie.poster_path;
        
          //Print data for user
          $("#movieDisplay").append("<h4>" + title + "</h4  ><img src=" + poster + "><p>" + overView + "</p><p><strong>Release Date:</strong> " + formattedReleaseDate + "</p><p><strong>Voter Average:</strong> " + voteAverage + "</p><div class='divider'></div>");
        
            //Adding active class to pagination
             switch (pageNum){
              case 1:
                $("li").removeClass("active");
                $("#1").addClass("active");
                break;
              case 2:
                $("li").removeClass("active");
                $("#2").addClass("active");
                break;
              case 3:
                $("li").removeClass("active");
                $("#3").addClass("active");
                break;
              case 4:
                $("li").removeClass("active");
                $("#4").addClass("active");
                break;
              case 5:
                $("li").removeClass("active");
                $("#5").addClass("active");
                break;
              default:
                break;
          }
        });
    });
  }

//If user clicks up arrow, move up a page
  $("#plus").on("click", function(){
    pageNum++;
    getMovies();
  });

//If user clicks down arrow, move down a page
  $("#minus").on("click", function(){
    pageNum--;
    getMovies();
  });

//When user clicks a number, query that page
  $(".page").on("click", function(){
    pageNum = $(this).val();
    getMovies();
  });

//Hoist query when user searches
  $("#search").on("click", function(event){
    event.preventDefault();
    userQuery = $("#userInput").val();
    getMovies();
  });

});