var tracker = {
  getForm: document.getElementById('searchForm'),
  menuForm: document.getElementById('menuForm'),
  searchInput: null,
  searches: [],
  matches: [],
  pushToLocal: [],
  icons: ['hbonow.png', 'hulu.jpg', 'netflix.jpg'],
  found: 0,
  trackPushButton: 0,
  services: null,

  getSearchInput: function(event) {
    event.preventDefault();
    this.searchInput = event.target.searchShows.value;
    tracker.querryDatabase(this.searchInput);
    if (tracker.found === 1) {
      tracker.writeResults(this.searchInput);
      tracker.found = 0;
    }
  },

  writeResults: function(searchValue) {
    var listItem = document.createElement('label');
    listItem.className = 'results';
    var check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'input';
    check.id = searchValue;
    tracker.searches.push(searchValue);
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

  checkLocalStorageStatus: function() {
    if (localStorage.userProfile) {
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
    }
  },

  storeSelectedMovies: function(event) {
    event.preventDefault();
    for (var searched in tracker.searches) {
      console.log(tracker.searches);
      var tempform = document.getElementById('menuForm');
      var tempInput = document.getElementById(tracker.searches[searched]);
      console.log(tempInput);
      if (tempInput.checked) {
        for (var match in tracker.matches) {
          if (tracker.matches[match].title === tempInput.id) {
            tracker.pushToLocal.push(tracker.matches[match]);
            // tempform.innerHTML = '';
            // tracker.trackPushButton = 0;
            tracker.searches = [];
          }
        }
      }
    }
  }
};

tracker.getForm.addEventListener('submit', tracker.getSearchInput);
tracker.menuForm.addEventListener('submit', tracker.storeSelectedMovies);
