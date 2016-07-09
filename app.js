var tracker = {
  getForm: document.getElementById('searchForm'),
  searchInput: null,
  getSearchInput: function(event) {
    event.preventDefault();
    searchInput = event.target.searchShows.value;
    console.log(searchInput);
  }
};

tracker.getForm.addEventListener('submit', tracker.getSearchInput);
