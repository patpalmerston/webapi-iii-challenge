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

module.exports = router;