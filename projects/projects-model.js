const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true, 
  connection: {
    filename: './data/projects.db3'
  }
};

const db = knex(knexConfig);

module.exports = {
  find,
  findById,
  add,
  getProjects,
  update,
  remove
};

function find() {
  return db('projects'); 
}

function findById(id) {
  return db('projects')
    .where({ id })
    .first(); 
}

function add(project) {
  return db('projects')
    .insert(project)
    .then(ids => {
      const [id] = ids;

      return db('projects')
        .where({ id })
        .first();
    });
}

function getProjects(project_id) {
  return db('actions')
  .where('project_id', project_id)
}

function update(id, changes) {
  return db('projects')
    .where({ id })
    .update(changes)
    .then(() => {
      return db('projects')
        .where({ id })
        .first();
    });
}

function remove(id) {
  return db('projects')
    .where({ id })
    .del();
}