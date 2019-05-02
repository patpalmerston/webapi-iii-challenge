const express = require('express');
const userDb = require ('../helpers/userDb');
const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
}

router.get('/', async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users)
  } catch (err) {sendUserError(500, 'The post with the specified ID does not exist.', err)}
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "The post information could not be retrieved." })
    }
  } catch (err) {sendUserError(500, "The post information could not be retrieved.", err )}
});

router.post('/', async (req, res) => {
  try {
    const myUser = await userDb.insert(req.body);
    res.status(201).json(myUser);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding post',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await userDb.remove(req.params.id);
    if (user > 0) {
      res.status(200).json({ message: 'The user has been Destroyed!'})
    } else {
      res.status().json({ message: "The user with that ID can not be found"})
    }
  } catch (err) {sendUserError(500, "The user could not be removed", err)}
});

router.put('/:id', async (req, res) => {
  try{
    const user = await userDb.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'the post could not be found'})
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating the post!'
    })
  }
});

module.exports = router;