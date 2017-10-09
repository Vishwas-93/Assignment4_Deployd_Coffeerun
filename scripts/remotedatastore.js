(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied');
    }
    this.serverUrl = url;
    this.data = {};
    this.getCoffeeId = getCoffeeId;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    // $.post(this.serverUrl, JSON.stringify(val), function (data,status) {
    //   console.log(status);
    //   console.log(data);
    // });
    // dpd.coffeeorders.post(val, function(result, err) {
    //   if(err) return console.log(err);
    //   console.log(result, result.id);
    // });

    $.ajax(this.serverUrl, {
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(val),
      success: function(coffeeorders) {
        console.log(coffeeorders);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.ajax(this.serverUrl, {
      type: 'GET',
      contentType: 'application/json',
      success: function(res) {
        this.data = res;
        cb(res);
      }.bind(this),
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };



  RemoteDataStore.prototype.get = function(key, cb) {

    $.ajax(this.serverUrl + '/' + this.getCoffeeId(key), {
      type: 'GET', //<-----this should have to be an object.
      contentType: 'application/json', // <---add this
      dataType: 'json', // <---update this
      success: function(result) {
        console.log(result);
      },
      error: function(result) {
        console.log(result);
      }
    });
  };

  RemoteDataStore.prototype.delete = function(key) {
  // $.ajax(this.serverUrl + '/' + key, {
  //   type: 'DELETE'
  // });

    $.ajax(this.serverUrl + '/' + this.getCoffeeId(key), {
      type: 'DELETE', //<-----this should have to be an object.
      // contentType:'application/json',  // <---add this
      dataType: 'json', // <---update this
      success: function(result) {
        console.log(result);
      },
      error: function(result) {
        console.log(result);
      }
    });
  };

  function getCoffeeId(email) {
    var id;
    $.each(this.data, function(i, val) {
      if (val.emailAddress == email) {
        id = val.id;
        return false;
      }
    });
    return id;
  }

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
