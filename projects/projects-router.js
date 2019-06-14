const db = require('./projects-model');

const router = require('express').Router();

router.get('/', (req, res) => {
  // get the projects from the database
  db.find()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  // retrieve a project by id
  db.findById(req.params.id)
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(200).json(err);
    });
});


router.get('/:id/actions', (req, res) => {
  // retrieve a project by id with actions
  const {id} = req.params;
  db.getProjects(id)
  .then(action => {
      res.status(200).json(projects, action);
  })
  .catch(err => {
      res.status(500).json(err);
  })
})


router.post('/', (req, res) => {
  // add a project to the database
  db.add(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  if (!name || !description) {
    res.status(422).json({ message: 'name and description fields required' });
  }
  // update projects
  db.update(id, { name, description })
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: 'project not found' });
      }
    })
    .catch(err => {
      res.status(err).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // remove projects (inactivate the project)
  db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(204).end(); // we could also respond with 200 and a message
      }
    })
    .catch(err => {
      res.status(404).json({ message: 'project not found' });
    });
});

module.exports = router;