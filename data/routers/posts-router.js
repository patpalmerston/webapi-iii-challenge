const express = require('express');
const postDb = require ('../helpers/postDb');
const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
}



router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts)
  } catch (err) {sendUserError(500, 'The post with the specified ID does not exist.', err)}
});

module.exports = router;