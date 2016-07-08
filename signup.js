var userProfile = {
  'users': []
};

function User(name, email) {
  this.name = name;
  this.email = email;
}

document.getElementById('submit').onclick = function() {
  var name = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var newUser = new User(name, email);
  var JsonUser = JSON.stringify(newUser);
  userProfile.users.push(JsonUser);
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
};
