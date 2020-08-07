'use strict';

const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  db.models.User.findAll()
    .then(user => res.json(user))
    .catch(err => res.status(400).send(err));
});

router.post('/', (req, res) => {
  const { firstName, lastName, email, password, isAdmin } = req.body;

  db.models.User.create({
    firstName,
    lastName,
    email,
    password,
    isAdmin
  })
  .then(user => res.send(user))
  .catch(err => res.status(400).send(err));
});

router.delete('/:id', (req, res) => {
  db.models.User.destroy({
    where: { id: req.params.id }
  })
  .then(() => res.send('User deleted'))
  .catch(err => res.status(400).send(err));
});

router.put('/:id', (req, res) => {
  const { firstName, lastName, email, password, isAdmin } = req.body;

  db.models.User
    .findByPk(req.params.id)
    .then(user => user.update({
      firstName,
      lastName,
      email,
      password,
      isAdmin
    })
    .then(result => res.json(result)))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
