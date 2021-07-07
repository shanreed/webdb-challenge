
exports.seed = function(knex, Promise) {
  return knex('projects').insert([
    {name: 'Paint A Wall', 
    description: 'Make it Big'},
    {name: 'Creat A Website', 
    description: 'Be Creative'},
    {name: 'Create a App', 
    description: 'This Should be Good'}
  ]);
};
