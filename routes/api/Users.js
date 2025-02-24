'use strict';

const { authAdmin } = require('../../middleware/authUser');
const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  db.models.User.findAll()
    .then(user => res.json(user))
    .catch(err => res.status(400).send(err));
});

router.post('/', authAdmin, (req, res) => {
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

router.delete('/:id', authAdmin, (req, res) => {
  db.models.User.destroy({
    where: { id: req.body.id }
  })
  .then(() => res.send('User deleted'))
  .catch(err => res.status(400).send(err));
});

router.put('/:id', authAdmin, (req, res) => {
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
