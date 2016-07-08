var userProfile = {
  'users': []
}

function User(name, email) {
  this.name = name;
  this.email = email;
  this.netflix;
  this.hulu;
  this.hboGo;
}

document.getElementById('submit').onclick = function() {
  var name = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var netflix = document.getElementById('netflix');
  if (document.getElementById('netflix').checked) {
    netflix = 'yes';
  } else {
    netflix = 'no';
  }
  var hulu = document.getElementById('hulu');
  var hboGo = document.getElementById('hboGo');
  var newUser = new User(name, email, netflix, hulu, hboGo);
  var JsonUser = JSON.stringify(newUser);
  userProfile.users.push(JsonUser);
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
};
