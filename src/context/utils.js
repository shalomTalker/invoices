module.exports = {
  fetchLocalResource: function fetchLocalResource(resourceName) {
    return JSON.parse(localStorage.getItem(resourceName));
  },
  saveLocalResource: function saveLocalResource(resourceName, data) {
    localStorage.setItem(resourceName, JSON.stringify(data));
  },
};
