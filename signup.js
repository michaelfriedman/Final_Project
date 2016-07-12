function User(name, email) {
  this.name = name;
  this.email = email;
  this.netflix = netflix.checked;
  this.hulu = hulu.checked;
  this.hboNow = hboNow.checked;
  this.watchList = [];
  this.seenItList = [];
}

function getTheThings(event) {
  event.preventDefault();
  var user_name = event.target.user_name.value;
  var user_email = event.target.user_email.value;
  var newUser = new User(user_name, user_email);

  var JsonUser = JSON.stringify(newUser);
  localStorage.setItem('userProfile', JsonUser);
  var something = JSON.parse(localStorage.getItem('userProfile'));
  something.shows = [];
  localStorage.setItem('userProfile', JSON.stringify(something));
  var signup = document.getElementById('signup');
  var profile = document.getElementById('profileFrontPage');
  signup.style.display = 'none';
  profile.style.display = 'block';
};

var signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', getTheThings);



function getUserMovies() {
  var userProfile = JSON.parse(localStorage.getItem('userProfile'));
  console.log(userProfile);
}
getUserMovies();

(function() {
  var signup = document.getElementById('signup');
  var profile = document.getElementById('profileFrontPage');
  if(localStorage.userProfile) {
    signup.style.display = 'none';
    profile.style.display = 'block';
    console.log('success');
  }
})();
