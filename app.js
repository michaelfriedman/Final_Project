var tracker = {
  getForm: document.getElementById('searchForm'),
  menuForm: document.getElementById('menuForm'),
  searchInput: null,
  searchMatches: [],
  apiMatches: [],
  matches: [],
  pushToLocal: [],
  icons: ['hbonow.png', 'hulu.jpg', 'netflix.jpg'],
  found: 0,
  trackPushButton: 0,
  listNumber: 0,
  services: null,

  getSearchInput: function(event) {
    event.preventDefault();
    this.searchInput = event.target.searchShows.value;
    tracker.querryDatabase(this.searchInput);
    if (tracker.found === 1) {
      if (tracker.searchMatches.indexOf(this.searchInput) === -1) {
        tracker.writeResults(this.searchInput);
        tracker.found = 0;
      }
    }
  },

  writeResults: function(searchValue) {
    var listItem = document.createElement('label');
    listItem.id = '' + tracker.listNumber;
    tracker.listNumber += 1;
    var check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'input';
    check.id = searchValue;
    tracker.searchMatches.push(searchValue);
    listItem.textContent = searchValue;
    tracker.printIcons(listItem);
    listItem.appendChild(check);
    tracker.menuForm.appendChild(listItem);
    tracker.checkLocalStorageStatus();
  },

  querryDatabase: function(searchValue) {
    for (var show in shows) {
      if (shows[show].title === searchValue) {
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
      if (tempInput.checked) {
        if (tracker.matches[searched].title === tempInput.id && tracker.pushToLocal.indexOf(tracker.matches[searched]) === -1) {
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
        user.showNames.push(tracker.pushToLocal[selected].title);
      }
    } else {
      for (var checked in tracker.pushToLocal) {
        if (user.showNames.indexOf(tracker.pushToLocal[checked].title) === -1) {
          user.shows.push(tracker.pushToLocal[checked]);
          user.showNames.push(tracker.pushToLocal[checked].title);
        }
      }
    }
  },

  checkIfInAPI: function(searchInput) {
    netflixroulette.createRequest(searchInput, function (resp) {
      console.log(resp.poster);
      tracker.apiMatches.push(resp);
      tracker.found = 1;
      tracker.services = ['Netflix'];
      tracker.matches.push(resp);
    });
  }
};

tracker.getForm.addEventListener('submit', tracker.getSearchInput);
tracker.menuForm.addEventListener('submit', tracker.storeSelectedMovies);
tracker.checkIfInAPI('How I Met your mother');
