const cleaner = require('knex-cleaner')
exports.seed = function(knex, Promise) {
  return cleaner.clean(knex);//reset the primary keys
  
};