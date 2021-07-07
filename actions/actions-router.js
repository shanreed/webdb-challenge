const db = require('./actions-model');

const router = require('express').Router();

router.get('/', (req, res) => {
  // get the actions from the database
  db.find()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  // retrieve a action by id
  db.findById(req.params.id)
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(200).json(err);
    });
});

router.post('/', (req, res) => {
  // add a action to the database
  db.add(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { description, notes, project_id  } = req.body;
  const { id } = req.params;
  if (!description || !notes || !project_id) {
    res.status(422).json({ message: 'description, notes, and project_id fields required' });
  }
  // update actions
  db.update(id, { description, notes, project_id  })
    .then(action => {
      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ message: 'action not found' });
      }
    })
    .catch(err => {
      res.status(err).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // remove actions (inactivate the action)
  db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(204).end(); // we could also respond with 200 and a message
      }
    })
    .catch(err => {
      res.status(404).json({ message: 'action not found' });
    });
});

module.exports = router;