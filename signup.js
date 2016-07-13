var userMovies = [];
var userMovieNames = [];

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
  var localStuff = JSON.parse(localStorage.getItem('userProfile'));
  localStuff.shows = [];
  localStuff.showNames = [];
  localStorage.setItem('userProfile', JSON.stringify(localStuff));
  var signup = document.getElementById('signup');
  var profile = document.getElementById('profileFrontPage');
  signup.style.display = 'none';
  profile.style.display = 'block';
  getUserMovies();
};

var signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', getTheThings);



function getUserMovies() {
  var userProfile = JSON.parse(localStorage.getItem('userProfile'));
  for (var show in userProfile.shows) {
    userMovies.push(userProfile.shows[show]);
    userMovieNames.push(userProfile.showNames[show]);
  }
};

function updateLocalStorage() {
  var userProfile = JSON.parse(localStorage.getItem('userProfile'));
  
}

function createLabels() {
  var div = document.getElementById('watchList');
  for (var movieName in userMovieNames) {
    var servicesArray = userMovies[movieName].servicesArray;
    var label = document.createElement('label');
    label.id = userMovieNames[movieName];
    console.log(label.id);
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = movieName + '';
    checkbox.style.marginLeft = '10px';
    label.textContent = userMovieNames[movieName];
    checkForIcons(servicesArray, label);
    label.appendChild(checkbox);
    div.appendChild(label);
  }
};

function checkForIcons(servicesArray, label) {
  for (var service in servicesArray) {
    var img = document.createElement('img');
    if (servicesArray[service] === 'HBONow') {
      img.src = 'icons/hbonow.png';
    } else if (servicesArray[service] === 'Hulu') {
      img.src = 'icons/hulu.jpg';
    } else {
      img.src = 'icons/netflix.jpg';
    }
    label.appendChild(img);
  }
}

function deleteSelectedItems(event) {
  event.preventDefault();
  for (var movieQty in userMovies) {
    var truthy = document.getElementById(movieQty + '');
    if (truthy.checked) {
      var label = document.getElementById(userMovieNames[movieQty]);
      console.log(label);
      label.remove();
      userMovies.splice(movieQty, 1);
      userMovieNames.splice(movieQty, 1);
    }
  }
  console.log('Something is happening...');
  // location.reload();
}

var watchListForm = document.getElementById('watchListSubmit');
watchListForm.addEventListener('submit', deleteSelectedItems);

(function() {
  var signup = document.getElementById('signup');
  var profile = document.getElementById('profileFrontPage');
  if(localStorage.userProfile) {
    signup.style.display = 'none';
    profile.style.display = 'block';
    getUserMovies();
    createLabels();
  }
})();
