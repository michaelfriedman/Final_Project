function getUserName() {
  if (localStorage.userProfile) {
    console.log(localStorage.userProfile);
    var getUserNameData = JSON.parse(localStorage.getItem('userProfile'));
    console.log(getUserNameData);
    console.log(getUserNameData.name);
    document.getElementById('username').innerHTML = getUserNameData.name
    if (getUserNameData.netflix === true) {
      document.getElementById('icons').innerHTML = '<a href="https://www.netflix.com/" target = "_blank"><img src="icons/netflix.jpg"/></a>'
    }
    if (getUserNameData.hulu === true) {
      document.getElementById('icons2').innerHTML = '<a href="http://www.hulu.com/welcome" target = "_blank"><img src="icons/hulu.jpg"/></a>'
    }
    if (getUserNameData.hboNow === true) {
      document.getElementById('icons3').innerHTML = '<a href="https://order.hbonow.com/" target = "_blank"><img src="icons/hbonow.png"/></a>'
    }
  }
};
getUserName();
