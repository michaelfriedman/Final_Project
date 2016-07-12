function User(name, email, netflix, hulu, hboNow) {
  this.name = name;
  this.email = email;
  this.netflix = netflix.checked;
  this.hulu = hulu.checked;
  this.hboNow = hboNow.checked;
  this.watchList = [];
  this.seenItList = [];
}

function getLocalStorage() {
  if (localStorage.userProfile) {
    var strUserProfile = localStorage.getItem('userProfile');
    var userProfile2 = JSON.parse(strUserProfile);
    if (userProfile2) {
      var newUser2 = new User(userProfile2.name, userProfile2.email, userProfile2.netflix, userProfile2.hulu, userProfile2.hboNow);
      document.getElementById('watchList').innerHTML = '';
      for (var index of userProfile2.watchList) {
        var newLI = document.createElement('li');
        newLI.appendChild(document.createTextNode(index));
        document.getElementById('watchList').appendChild(newLI);
      }
    }
  }
}
