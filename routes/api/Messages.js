'use strict';

const authAdmin = require('../../middleware/authAdmin');
const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  db.models.Message
    .findAll({
      where: {
        FK_room: req.query.roomId
      },
      include: [{
        model: db.models.User, as: 'userMessage'
      }]
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err));
});

router.post('/', (req, res) => {
  const { time, content, fkRoom, fkUser } = req.body;

  db.models.Message.create({
    time,
    content,
    FK_room: fkRoom,
    FK_user: fkUser
  })
  .then(msg => res.send(msg))
  .catch(err => res.status(400).send(err));
});

router.delete('/:id', authAdmin, (req, res) => {
  db.models.Message.destroy({
    where: { id: req.body.id }
  })
  .then(() => res.send('Message deleted'))
  .catch(err => res.status(400).send(err));
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
    },
    returning: true,
    plain: true
  })
  .then(msg => res.json(msg))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
