var _ = require('lodash');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var faker = require('faker');

var NAMES_COUNT = 30;
var LIKES_COUNT = 6;

var users = _.map(_.range(NAMES_COUNT), function(val) {
  return faker.name.firstName().toLowerCase();
})
//console.log(users);

fs.readFileAsync('items/cities.json')
.then(function(res) {
  return JSON.parse(res);
})
.map(function(res) {
  return _.pick(res, ['geo', 'city', 'country_icon', 'country'])
})
.map(function(res) {
  var name = faker.address.streetName() + ' Restaurant';
  var rating = faker.random.number({
    min: 250,
    max: 500
  }) / 100

  var likes = _.sampleSize(users, LIKES_COUNT);
  return _.merge(res, {
    rating: rating,
    name: name,
    likes: likes
  })
})
.then(function(res) {
  return fs.writeFileAsync('./items/restaurants.json', JSON.stringify(res, null, 2), 'utf-8')
})
