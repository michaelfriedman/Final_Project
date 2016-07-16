var apiMatches = [];
var apiTest = 0;
var tempAPIMovie = null;
var differentiator = null;
// var element = document.getElementById('pic');
var api = {
  API_URL: 'http://netflixroulette.net/api/api.php?title=',
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
    if (results) {
      console.log(results);
      apiMatches.push(results);
      apiTest = 1;
      tempAPIMovie = results;
      tempAPIMovie.servicesArray = ['Netflix'];
      differentiator = 1;
    } else {
      console.log('Value not found');
      tempAPIMovie = null;
      results = null;
      apiTest = 0;
    }
  }
};

var tracker = {
  getForm: document.getElementById('searchForm'),
  menuForm: document.getElementById('menuForm'),
  searchInput: null,
  searchMatches: [],
  apiMatches: [],
  matches: [],
  pushToLocal: [],
  apiSearchMatch: null,
  icons: ['hbonow.png', 'hulu.jpg', 'netflix.jpg'],
  found: 0,
  trackPushButton: 0,
  listNumber: 0,
  services: null,

  getSearchInput: function(event) {
    event.preventDefault();
    this.searchInput = event.target.searchShows.value;
    api.checkUserInput(this.searchInput);
    if (apiTest === 1) {
      console.log(apiTest);
      tracker.services = ['Netflix'];
      console.log(tempAPIMovie.show_title);
      tracker.matches.push(tempAPIMovie);
      if (document.getElementById('error')) {
        console.log('yep');
        var deleteMessage = document.getElementById('error');
        deleteMessage.remove();
      }
      tracker.writeResults();
    } else {
      tracker.querryDatabase(this.searchInput);
      if (tracker.found === 1) {
        differentiator = 2;
        if (tracker.searchMatches.indexOf(this.searchInput) === -1) {
          tracker.writeResults(this.searchInput);
          tracker.found = 0;
        }
        if (document.getElementById('error')) {
          var deleteError = document.getElementById('error');
          deleteError.remove();
        }
      } else {
        console.log('error');
        var error = document.createElement('p');
        error.id = 'error';
        error.textContent = 'I\'m sorry, but that title could not be found.';
        tracker.menuForm.appendChild(error);
      }
    }
  },

  writeResults: function(searchValue) {
    var listItem = document.createElement('label');
    listItem.id = '' + tracker.listNumber;
    tracker.listNumber += 1;
    var check = document.createElement('input');
    var poster = document.createElement('img');
    poster.className = 'poster';
    poster.style.marginRight = '10px';
    check.type = 'checkbox';
    check.className = 'input';
    if (differentiator === 1) {
      poster.src = tempAPIMovie.poster;
      tracker.searchMatches.push(tempAPIMovie.show_title);
      listItem.textContent = tempAPIMovie.show_title;
      $(listItem).prepend(poster);
      check.id = tempAPIMovie.show_title;
    } else {
      tracker.searchMatches.push(searchValue);
      listItem.textContent = searchValue;
      check.id = searchValue;
    }
    console.log(tracker.searchMatches);
    tracker.printIcons(listItem);
    listItem.appendChild(check);
    tracker.menuForm.appendChild(listItem);
    tracker.checkLocalStorageStatus();
  },

  querryDatabase: function(searchValue) {
    for (var show in shows) {
      if (shows[show].show_title === searchValue) {
        tracker.found = 1;
        tracker.services = shows[show].servicesArray;
        tracker.matches.push(shows[show]);
      }
    }
  },

  printIcons: function(section) {
    for (var service in tracker.services) {
      if (tracker.services[service] === 'Netflix') {
        var imgItem = document.createElement('img');
        imgItem.src = 'icons/' + tracker.icons[2];
        section.appendChild(imgItem);
      } else if (tracker.services[service] === 'Hulu') {
        var imgItem2 = document.createElement('img');
        imgItem2.src = 'icons/' + tracker.icons[1];
        section.appendChild(imgItem2);
      } else if (tracker.services[service] === 'HBONow') {
        var imgItem3 = document.createElement('img');
        imgItem3.src = 'icons/' + tracker.icons[0];
        section.appendChild(imgItem3);
      }
    }
  },

  checkButtonStatus: function() {
    if (tracker.trackPushButton === 1) {
      var deleteChild = document.getElementById('pushButton');
      tracker.menuForm.removeChild(deleteChild);
    }
    var pushButton = document.createElement('button');
    pushButton.id = 'pushButton';
    pushButton.type = 'submit';
    pushButton.textContent = 'Push to WatchList';
    tracker.menuForm.appendChild(pushButton);
    tracker.trackPushButton = 1;
  },

  checkLocalStorageStatus: function() {
    if (localStorage.userProfile) {
      tracker.checkButtonStatus();
    }
  },

  storeSelectedMovies: function(event) {
    event.preventDefault();
    for (var searched in tracker.searchMatches) {
      var tempInput = document.getElementById(tracker.searchMatches[searched]);
      console.log(tempInput);
      if (tempInput.checked) {
        console.log('working');
        if (differentiator === 1) {
          if (tracker.matches[searched].show_title === tempInput.id && tracker.pushToLocal.indexOf(tracker.matches[searched]) === -1) {
            tracker.pushToLocal.push(tracker.matches[searched]);
          }
        } else if (tracker.matches[searched].show_title === tempInput.id && tracker.pushToLocal.indexOf(tracker.matches[searched]) === -1) {
          tracker.pushToLocal.push(tracker.matches[searched]);
        }
        tempInput.remove();
        var text = document.createElement('p');
        text.className = 'itemPushed';
        text.textContent = '(Pushed to WatchList)';
        var label = document.getElementById('' + searched);
        label.appendChild(text);
        tracker.searchMatches.splice(searched, 1, 0);
        tracker.pushMoviesToLocalStorage();
      }
    }
  },
  pushMoviesToLocalStorage: function() {
    var user = JSON.parse(localStorage.getItem('userProfile'));
    tracker.checkLocalStorageShows(user);
    localStorage.setItem('userProfile', JSON.stringify(user));
  },

  checkLocalStorageShows: function(user) {
    if (!user.shows) {
      user.shows = [];
      user.showNames = [];
      for (var selected in tracker.pushToLocal) {
        user.shows.push(tracker.pushToLocal[selected]);
        user.showNames.push(tracker.pushToLocal[selected].show_title);
      }
    } else {
      for (var checked in tracker.pushToLocal) {
        if (user.showNames.indexOf(tracker.pushToLocal[checked].show_title) === -1) {
          user.shows.push(tracker.pushToLocal[checked]);
          user.showNames.push(tracker.pushToLocal[checked].show_title);
        }
      }
    }
  },
};

tracker.getForm.addEventListener('submit', tracker.getSearchInput);
tracker.menuForm.addEventListener('submit', tracker.storeSelectedMovies);
