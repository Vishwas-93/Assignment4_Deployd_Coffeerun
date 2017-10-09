(function(window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }
  Truck.prototype.createOrder = function(order) {
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order);
  };
  Truck.prototype.deliverOrder = function(customerId) {
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId);
  };
  Truck.prototype.printOrders = function(cb) {
    this.db.getAll(function(data){
      var customerIdArray = data;
      //console.log('Truck #' + this.truckId + 'has pending orders:');
      customerIdArray.forEach(function(item) {
        cb(item);
      });
    });
  };

  App.Truck = Truck;
  window.App = App;
})(window);
