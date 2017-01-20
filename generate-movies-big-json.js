var _ = require('lodash');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var faker = require('faker');

var NAMES_COUNT = 30;
var LIKES_COUNT = 6;

var users = _.map(_.range(NAMES_COUNT), function(val) {
  return faker.name.firstName().toLowerCase();
})

var records = process.env.RECORDS || 100

fs.readFileAsync('items/movies-processed.json')
.then(function(res) {
  return JSON.parse(res)
})
.then(function(res) {
  //console.log(res.length)

  for (var j = 0 ; j < records / res.length ; ++j) {
    for (var i = 0 ; i < res.length ; ++i) {
      console.log(JSON.stringify(res[i]))
    }
  }
})
