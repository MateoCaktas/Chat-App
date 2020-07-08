'use strict';

const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  db.models.Message.findAll().then(user => res.json(user));
});

router.post('/', (req, res) => {
  const { time, content, fkRoom, fkUser } = req.body;

  db.models.Message.create({
    time,
    content,
    FK_room: fkRoom,
    FK_user: fkUser
  });

  res.send('Message created');
});

router.delete('/:id', (req, res) => {
  db.models.Message.destroy({
    where: { id: req.params.id }
  });
});

router.put('/:id', (req, res) => {
  const { time, content, fkRoom, fkUser } = req.body;

  db.models.Message.update({
    time,
    content,
    FK_room: fkRoom,
    FK_user: fkUser
  }, {
    where: {
      id: req.params.id
    }
  });
});

module.exports = router;
