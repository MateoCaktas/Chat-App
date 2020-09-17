'use strict';

const { authAdmin } = require('../../middleware/authUser');
const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  db.models.UserLikes
    .findAll({
      where: {
        message_id: req.query.messageId
      }
    })
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err));
});

router.delete('/:id', authAdmin, (req, res) => {
  const { userId, messageId } = req.body;

  db.models.UserLikes.destroy({
    where: {
      message_id: messageId,
      user_id: userId
    }
  })
  .then(() => res.send('User like deleted'))
  .catch(err => res.status(400).send(err));
});

router.post('/', (req, res) => {
  const { userId, messageId } = req.body;

  db.models.UserLikes.create({
    message_id: messageId,
    user_id: userId
  })
    .then(like => res.json(like))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
