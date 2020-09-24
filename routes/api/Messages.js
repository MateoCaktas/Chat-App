'use strict';

const { authAdmin } = require('../../middleware/authUser');
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
      }, {
        model: db.models.User, as: 'users'
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

router.delete('/:id/likes/:userId', authAdmin, (req, res) => {
  db.models.UserLikes.destroy({
    where: {
      message_id: req.params.id,
      user_id: req.params.userId
    }
  })
  .then(() => res.send('User like deleted'))
  .catch(err => res.status(400).send(err));
});

router.post('/:id/likes/:userId', (req, res) => {
  db.models.UserLikes.create({
    message_id: req.params.id,
    user_id: req.params.userId
  })
    .then(like => res.json(like))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
