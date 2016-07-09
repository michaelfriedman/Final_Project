var tracker = {
  getForm: document.getElementById('searchForm'),
  menuForm: document.getElementById('menuForm'),
  searchInput: null,
  matches: [],
  icons: ['hbonow.png', 'hulu.jpg', 'netflix.jpg'],
  found: 0,
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
    var container = document.createElement('div');
    container.id = 'container';
    var check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'input';
    listItem.textContent = searchValue;
    tracker.printIcons(listItem);
    container.appendChild(check);
    listItem.appendChild(container);
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
    if (localStorage) {
      console.log('Local storage exists.');
    }
  }
};

tracker.getForm.addEventListener('submit', tracker.getSearchInput);
