var userMovies = [];
var userMovieNames = [];
var userTempMovies = [];
var userTempMovieNames = [];
var tempMovieId = [];
var sceneItMovies = [];
var sceneItMovieNames = [];
var sceneItMovieIds = [];
var tempSceneItRemove = [];
var tempCheckboxIds = [];
var checkBoxIds = [];
var tempSceneItMovies = [];
var tempSceneItMovieNames = [];

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
  localStuff.sceneItMovies = [];
  localStuff.sceneItMovieNames = [];
  localStuff.sceneItMovieIds = [];
  localStuff.checkBoxIds = [];
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
  sceneItMovies = userProfile.sceneItMovies;
  sceneItMovieNames = userProfile.sceneItMovieNames;
  sceneItMovieIds = userProfile.sceneItMovieIds;
  tempCheckboxIds = userProfile.checkBoxIds;
  for (var show in userProfile.shows) {
    userMovies.push(userProfile.shows[show]);
    userMovieNames.push(userProfile.showNames[show]);
  }
};

function updateLocalStorage() {
  var userProfile = JSON.parse(localStorage.getItem('userProfile'));
  userProfile.shows = userMovies;
  userProfile.showNames = userMovieNames;
  userProfile.sceneItMovies = sceneItMovies;
  userProfile.sceneItMovieNames = sceneItMovieNames;
  userProfile.sceneItMovieIds = sceneItMovieIds;
  userProfile.checkBoxIds = checkBoxIds;
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

function createLabels() {
  var div = document.getElementById('watchList');
  for (var movieName in userMovieNames) {
    var servicesArray = userMovies[movieName].servicesArray;
    var label = document.createElement('label');
    label.id = userMovieNames[movieName];
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = movieName + '';
    checkbox.style.marginLeft = '10px';
    label.textContent = userMovieNames[movieName];
    if (userMovies[movieName].poster) {
      var poster = document.createElement('img');
      poster.className = 'poster';
      poster.style.marginRight = '10px';
      console.log('poster');
      poster.src = userMovies[movieName].poster;
      console.log(poster.src);
      console.log(userMovies[movieName]);
      $(label).prepend(poster);
    }

    checkForIcons(servicesArray, label);
    label.appendChild(checkbox);
    div.appendChild(label);
  }
};

function createSceneItLabels() {
  updateLocalStorage();
  var div = document.getElementById('sceneIt');
  for (var scene in sceneItMovies) {
    var servicesArray2 = sceneItMovies[scene].servicesArray;
    var label = document.createElement('label');
    label.id = sceneItMovieNames[scene];
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = scene + '';
    checkbox.style.marginLeft = '10px';
    label.textContent = sceneItMovieNames[scene];
    checkForIcons(servicesArray2, label);
    label.appendChild(checkbox);
    div.appendChild(label);
  }
}

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
      label.remove();
    } else {
      userTempMovies.push(userMovies[movieQty]);
      userTempMovieNames.push(userMovieNames[movieQty]);
      tempMovieId.push(movieQty);
    }
  }
  userMovies = userTempMovies;
  userMovieNames = userTempMovieNames;
  reassignIds();
  updateLocalStorage();
};

function deleteSceneItMovie() {
  for (var i = 0; i < sceneItMovieIds.length; i++) {
    var tempElem = document.getElementById(sceneItMovieIds[i]);
    var tempCheck = document.getElementById(tempCheckboxIds[i]);
    if (tempCheck.checked) {
      tempElem.remove();
    } else {
      tempSceneItRemove.push(sceneItMovieIds[i]);
      tempCheckboxIds.push(i + '');
      tempSceneItMovies.push(sceneItMovies[i]);
      tempSceneItMovieNames.push(sceneItMovieNames[i]);
    }
  }
  sceneItMovieIds = tempSceneItRemove;
  checkBoxIds = tempCheckboxIds;
  tempCheckboxIds = [];
  sceneItMovies = tempSceneItMovies;
  sceneItMovieNames = tempSceneItMovieNames;
  tempSceneItMovies = [];
  tempSceneItMovieNames = [];
  updateLocalStorage();
  // location.reload();
};

function reassignIds() {
  if (userMovies.length) {
    for (var id in tempMovieId) {
      var tempElem = document.getElementById(tempMovieId[id] + '');
      tempElem.id = id + '';
    }
  }
  userTempMovies = [];
  userTempMovieNames = [];
  tempMovieId = [];
}

function moveToSceneIt() {
  var sceneItDiv = document.getElementById('sceneIt');
  for (var i = 0; i < userMovieNames.length; i++) {
    var check = document.getElementById(i + '');
    if (check.checked) {
      var moveThis = document.getElementById(userMovieNames[i]);
      var cln = moveThis.cloneNode(true);
      sceneItDiv.appendChild(cln);
      moveThis.remove();
      sceneItMovies.push(userMovies[i]);
      sceneItMovieNames.push(userMovieNames[i]);
      sceneItMovieIds.push(userMovieNames[i]);
      cln.id = userMovieNames[i];
      tempCheckboxIds.push(i + '');
    }
    else {
      userTempMovies.push(userMovies[i]);
      userTempMovieNames.push(userMovieNames[i]);
      tempMovieId.push(i + '');
    }
  }
  userMovies = userTempMovies;
  userMovieNames = userTempMovieNames;
  reassignIds();
  updateLocalStorage();
  // location.reload();
};

var watchListForm = document.getElementById('watchListSubmit');
watchListForm.addEventListener('submit', deleteSelectedItems);
var sceneItButton = document.getElementById('sceneItButton');
sceneItButton.addEventListener('click', moveToSceneIt);
var deleteIt = document.getElementById('deleteSceneIt');
deleteIt.addEventListener('click', deleteSceneItMovie);

(function() {
  var signup = document.getElementById('signup');
  var profile = document.getElementById('profileFrontPage');
  if(localStorage.userProfile) {
    signup.style.display = 'none';
    profile.style.display = 'block';
    getUserMovies();
    createLabels();
    createSceneItLabels();
    var deleteButton = document.getElementById('deleteButton');
    var sceneItButton = document.getElementById('sceneItButton');
    var deleteSceneItButton = document.getElementById('deleteSceneIt');
    if (userMovieNames.length > 0) {
      deleteButton.style.display = 'block';
      sceneItButton.style.display = 'block';
    }
    if (sceneItMovies.length > 0) {
      deleteSceneItButton.style.display = 'block';
    }
  }
})();
