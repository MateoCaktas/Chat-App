'use strict';

const { authenticateToken } = require('../../middleware/checkAuthentication');
const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  db.models.User.findAll().then(user => res.json(user));
});

router.post('/', authenticateToken, (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  db.models.User.create({
    firstName,
    lastName,
    email,
    password
  })
  .then(user => res.send(user))
  .catch(err => res.status(400).send(err));
});

router.delete('/:id', authenticateToken, (req, res) => {
  db.models.User.destroy({
    where: { id: req.params.id }
  })
  .then(() => res.status(202).send('User deleted'))
  .catch(err => res.status(400).send(err));
});

router.put('/:id', authenticateToken, (req, res) => {
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
    individualHooks: true,
    returning: true,
    plain: true
  })
  .then(result => res.status(202).send(result))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
