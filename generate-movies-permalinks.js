var _ = require('lodash');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var slug = require('slug')


fs.readFileAsync('items/movies-processed.json')
.then(function(res) {
  return JSON.parse(res)
})
.map(function(val) {
  val.permalink = slug(val.name, {lower: true}) + '-' + val.year
  return val
})
.then(function(res) {
  console.log(JSON.stringify(res, null, 2))
})
