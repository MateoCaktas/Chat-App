'use strict';

const { authenticateToken } = require('../../middleware/checkAuthentication');
const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  db.models.Message.findAll().then(msg => res.json(msg));
});

router.post('/', authenticateToken, (req, res) => {
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

router.delete('/:id', authenticateToken, (req, res) => {
  db.models.Message.destroy({
    where: { id: req.params.id }
  })
  .then(() => res.status(202).send('Message deleted'))
  .catch(err => res.status(400).send(err));
});

router.put('/:id', authenticateToken, (req, res) => {
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
  .then(msg => res.status(202).send(msg))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
