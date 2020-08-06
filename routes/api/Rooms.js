'use strict';

const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  db.models.Room.findAll()
  .then(room => {
    res.json(room);
  })
  .catch(err => res.status(400).send(err));
});

router.post('/', (req, res) => {
  const { creationTime, name, limit, usersIDs } = req.body;
  db.models.Room.create({
    creationTime,
    name,
    limit
  }).then(room => {
    room.setBelongingUsers(usersIDs);
    return room;
  })
    .then(room => res.send(room))
    .catch(err => res.status(400).send(err));
});

router.delete('/:id', (req, res) => {
  db.models.Room.destroy({
    where: { id: req.params.id }
  })
  .then(() => res.send('Room deleted'))
  .catch(err => res.status(400).send(err));
});

router.put('/:id', (req, res) => {
  const { name, limit } = req.body;

  db.models.Room
    .findByPk(req.params.id)
    .then(room => room.update({
      name,
      limit
    })
    .then(room => res.json(room)))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
