'use strict';

const { authAdmin, authUser } = require('../../middleware/authUser');
const db = require('../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // If the user is not Admin, set the ID and retrieve only his rooms
  const id = !req.user.isAdmin ? req.user.id : null;

  getRooms(id)
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).send(err));
});

router.post('/', authAdmin, (req, res) => {
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
      .then(async room => {
        await room.setBelongingUsers(users);
        return room;
      })
      .then(room => res.send(room))
      .catch(err => res.status(400).send(err));
    });
});

router.delete('/:id', authAdmin, (req, res) => {
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
        .then(async room => {
          await room.setBelongingUsers(users);
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

router.delete('/:id/users/:userId', authUser, (req, res) => {
  const user = db.models.User.findOne({
    where: {
      id: req.params.userId
    }
  });

  const room = db.models.Room.findOne({
    where: {
      id: req.params.id
    }
  });
  Promise.all([user, room])
    .then(userRoom => {
      const [user, room] = userRoom;
      room.removeBelongingUsers(user);
    })
    .then(() => res.send('User successfuly deleted.'))
    .catch(err => res.send(err));
});

function getRooms(id) {
  const include = [];

  if (id) {
    include.push({
      model: db.models.User,
      as: 'BelongingUsers',
      where: { id }
    });
  }

  return db.models.Room.findAll({ include });
}

module.exports = router;
