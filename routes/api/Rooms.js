'use strict';

const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  db.models.Room.findAll().then(room => {
    res.json(room);
  });
});

router.post('/', (req, res) => {
  const { creationTime, name, limit, usersIDs } = req.body;

  db.models.Room.create({
    creationTime,
    name,
    limit
  }).then(room => {
    return room.setBelongingUsers(JSON.parse(usersIDs));
  })
  .then(() => res.send('Room created!'))
  .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
  db.models.Room.destroy({
    where: { id: req.params.id }
  });
});

router.put('/:id', (req, res) => {
  const { creationTime, name, limit } = req.body;
  db.models.Room.update({
    creationTime,
    name,
    limit
  }, {
    where: {
      id: req.params.id
    }
  });
});

module.exports = router;
