//API content;

// var API_url = 'api-public.guidebox.com/v1.43/';
// var API_example = 'https://api-public.guidebox.com/v1.43/US/J3L7efof5dyFHIylm3ZBmrspeRGTHg/show/2098';
// xhttp = new XMLHttpRequest();
// xhttp.open("GET", API_example, true);
// xhttp.send();
// console.log(apiObject);
var a = [];
$.ajax({
  url: 'https://api-public.guidebox.com/v1.43/US/J3L7efof5dyFHIylm3ZBmrspeRGTHg/show/2098',
  complete: function(data) {
    a.push(data);
  }
});
