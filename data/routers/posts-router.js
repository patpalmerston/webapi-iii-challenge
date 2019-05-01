const express = require('express');
const postDb = require ('../helpers/postDb');
const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
}



// router.get('/', (req, res) => {
//   postDb
//   .get()
//   .then(user => {
//       res.status(200).json(user)
//   })
//   .catch(err => {
//       res.status(500).json({ message: "There was an error fetching the users."})
//   })
// })

// router.get('/', async (req, res) => {
//   try {
//       const posts = await postDb.get();
//       res.status(200).json(posts);
//   } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "The posts information could not be retrieved"})
//   }
// });


router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts)
  } catch (err) {sendUserError(500, 'The post with the specified ID does not exist.', err)}
});

module.exports = router;