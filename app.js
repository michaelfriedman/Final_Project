var tracker = {
  getForm: document.getElementById('searchForm'),
  resultsList: document.getElementById('resultsList'),
  searchInput: null,
  matches: [],
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
    var listItem = document.createElement('li');
    listItem.textContent = searchValue + '----->' + tracker.services;
    tracker.resultsList.appendChild(listItem);
  },

  querryDatabase: function(searchValue) {
    for (var show in shows) {
      if (shows[show].title === searchValue) {
        console.log(searchValue);
        tracker.found = 1;
        tracker.services = shows[show].servicesArray;
      }
    }
    console.log(shows);
  }
};

tracker.getForm.addEventListener('submit', tracker.getSearchInput);
