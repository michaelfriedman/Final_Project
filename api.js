var movies = [];
// var element = document.getElementById('pic');
var api = {
  API_URL: 'https://netflixroulette.net/api/api.php?title=',
  checkUserInput: function(userInput) {
    var userValueEdited = userInput.replace(/\s/ig, '%20');
    jQuery.extend({
      getValues: function(url) {
        var result = null;
        $.ajax({
          url: url,
          type: 'get',
          dataType: 'json',
          async: false,
          success: function(data) {
            result = data;
          }
        });
        return result;
      }
    });
    var results = $.getValues(this.API_URL + userValueEdited);
    console.log(results);
    movies.push(results);
      // tracker.apiMatches.push(userInput);
      // tracker.found = 1;
      // tracker.services = ['Netflix'];
      // tracker.matches.push(resp);
  }
};
api.checkUserInput('Breaking bad');
console.log(movies);
