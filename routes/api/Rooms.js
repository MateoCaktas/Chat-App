'use strict';

const authAdmin = require('../../middleware/authAdmin');
const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', authAdmin, (req, res) => {
  if (req.isAdmin) {
    db.models.Room.findAll()
      .then(room => res.json(room))
      .catch(err => res.status(400).send(err));
  } else {
    // If the user is not admin, get only HIS rooms
    db.models.Room
      .findAll({
        where: {},
        include: [{
          model: db.models.User,
          as: 'BelongingUsers',
          where: {
            id: req.user.id
          }
        }]
      })
      .then(room => res.json(room))
      .catch(err => res.status(400).send(err));
  }
});

router.post('/', (req, res) => {
  const { creationTime, name, limit, usersEmails } = req.body;

  db.models.User.findAll({
    where: { email: usersEmails }
  })
    .then(users => {
      db.models.Room.create({
        creationTime,
        name,
        limit
      })
      .then(room => {
        room.setBelongingUsers(users);
        return room;
      })
      .then(room => res.send(room))
      .catch(err => res.status(400).send(err));
    });
});

router.delete('/:id', (req, res) => {
  db.models.Room.destroy({
    where: { id: req.params.id }
  })
  .then(() => res.send('Room deleted'))
  .catch(err => res.status(400).send(err));
});

router.put('/:id', (req, res) => {
  const { name, limit, usersEmails } = req.body;

  db.models.User.findAll({
    where: { email: usersEmails }
  })
    .then(users => {
      db.models.Room
        .findByPk(req.params.id)
        .then(room => room.update({
          name,
          limit
        })
        .then(room => {
          room.setBelongingUsers(users);
          return room;
        })
        .then(room => res.send(room)))
        .catch(err => res.status(400).send(err));
    });
});

router.get('/:id/users', (req, res) => {
  db.models.Room
    .findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.models.User, as: 'BelongingUsers'
      }]
    })
    .then(result => res.send(result.BelongingUsers))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
