
exports.seed = function(knex, Promise) {
  return knex('actions').insert([
    {project_id: 1, 
     description: 'Get Supplies',
     notes: 'Cheap ones will do'},
    {project_id: 2, 
     description: 'Learn to code',
     notes: 'The more you code the more you know'},
    {project_id: 3, 
     description: 'Use React',
     notes: 'This should be fun'}
  ]);
};