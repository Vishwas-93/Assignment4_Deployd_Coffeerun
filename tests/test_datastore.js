var DataStore = window.App.DataStore;
var ds = new App.DataStore();
//console.log(ds);
var add1 = ds.add('m@bond.com', 'tea');
console.log(add1);
var add2 = ds.add('james@bond.com', 'eshpressho');
console.log(add2);
var getallval = ds.getAll();
console.log(getallval);
var del1 = ds.delete('james@bond.com');
console.log(del1);
var getallfin = ds.getAll();
console.log(getallfin);
var get1 = ds.get('m@bond.com');
console.log(get1);
var get2 = ds.get('james@bond.com');
console.log(get2);
