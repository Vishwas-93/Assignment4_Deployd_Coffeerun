(function(window) {
  'use strict';
  var App = window.App || {};

  function DataStore() {
    //console.log('Running the DataStore function');
    this.data = {};
  }
  DataStore.prototype.add = function(key, value) {
    this.data[key] = value;
    //console.log('Inside Add');
  };
  DataStore.prototype.get = function(key) {
    return this.data[key];
  };
  DataStore.prototype.getAll = function() {
    return this.data;
  };
  DataStore.prototype.delete = function(key) {
    delete this.data[key];
  };
  App.DataStore = DataStore;
  window.App = App;
})(window);
