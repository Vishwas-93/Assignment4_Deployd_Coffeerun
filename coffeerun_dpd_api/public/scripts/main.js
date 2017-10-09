(function(window) {
  'use strict';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var SERVER_URL = 'http://localhost:2403/coffeeorders';

  // jQuery.ajax('http://localhost:2403/coffeeorders', {
  //   statusCode: {
  //     404: function() {
  //       alert('Not working');
  //     },
  //     200: function() {
  //       alert('Working');
  //     }
  //   }
  // });

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  //var webshim = window.webshim;
  // console.log("-------------Testing------------");
  // console.log($($(document.body).children()[0]).attr("data-coffee-order"));
  var myTruck = new Truck('ncc-1701', remoteDS);
  window.myTruck = myTruck;
  //try {
  var checklist = new CheckList(CHECKLIST_SELECTOR);
  checklist.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function (data){
    myTruck.createOrder.call(myTruck, data);
    myTruck.printOrders(function(item){
      checklist.addRow.call(checklist,item);
    });
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);
  //} catch (e) {
  //console.log('Unable to create formhandler, as index.html of tests doesn"t have form element');
  //}
})(window);
