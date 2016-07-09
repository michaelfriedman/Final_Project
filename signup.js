var userProfile = {
  'users': []
};

function User(name, email) {
  this.name = name;
  this.email = email;
  this.netflix = netflix.checked;
  this.hulu = hulu.checked;
  this.hboNow = hboNow.checked;
}

function getTheThings(event) {
  event.preventDefault();
  var user_name = event.target.user_name.value;
  var user_email = event.target.user_email.value;
  var newUser = new User(user_name, user_email);
  console.log(newUser);
  var JsonUser = JSON.stringify(newUser);
  userProfile.users.push(JsonUser);
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
};

var signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', getTheThings);
