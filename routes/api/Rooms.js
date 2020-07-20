'use strict';

const { authenticateToken } = require('../../middleware/checkAuthentication');
const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  db.models.Room.findAll()
  .then(room => {
    res.json(room);
  })
  .catch(err => res.status(400).send(err));
});

router.post('/', authenticateToken, (req, res) => {
  const { creationTime, name, limit, usersIDs } = req.body;
  db.models.Room.create({
    creationTime,
    name,
    limit
  }).then(room => {
    return room.setBelongingUsers(usersIDs);
  })
    .then(room => res.send(room))
    .catch(err => res.status(400).send(err));
});

router.delete('/:id', authenticateToken, (req, res) => {
  db.models.Room.destroy({
    where: { id: req.params.id }
  })
  .then(() => res.status(202).send('Room deleted'))
  .catch(err => res.status(400).send(err));
});

router.put('/:id', authenticateToken, (req, res) => {
  const { creationTime, name, limit } = req.body;
  db.models.Room.update({
    creationTime,
    name,
    limit
  }, {
    where: {
      id: req.params.id
    },
    returning: true,
    plain: true
  })
  .then(room => res.status(202).send(room))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
