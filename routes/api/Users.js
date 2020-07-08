'use strict';

const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  db.models.User.findAll().then(user => res.json(user));
});

router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  db.models.User.create({
    firstName,
    lastName,
    email,
    password
  });

  res.send('User created!');
});

router.delete('/:id', (req, res) => {
  db.models.User.destroy({
    where: { id: req.params.id }
  });
});

router.put('/:id', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  db.models.User.update({
    firstName,
    lastName,
    email,
    password
  }, {
    where: {
      id: req.params.id
    },
    individualHooks: true
  })
  .then(() => res.send(`User ${firstName} ${lastName} updated.`));
});

module.exports = router;
