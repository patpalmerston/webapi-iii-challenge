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

router.get('/:id', async (req, res) => {
  try {
    const post = await postDb.getById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "The post information could not be retrieved." })
    }
  } catch (err) {sendUserError(500, "The post information could not be retrieved.", err )}
});

// router.post('/:id', async (req, res) => {
//   const post = req.body;
//   if (post.text && post.user_id) {
//     postDb.insert(post)
//       .then(post => {
//         res.status(200).json(post)
//       })
//       .catch(err => {
//         res.status(500).json({
//           message: 'Error retrieving the posts'
//         });
//       });
//   } else {
//     res.status(400).json({
//       errorMessage: "There was an error while saving the post to the database."
//     });
//   }
// });

// diff post version to insert new post


router.post('/', async (req, res) => {
  try {
    const myPost = await postDb.insert(req.body);
    res.status(201).json(myPost);
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
    const post = await postDb.remove(req.params.id);
    if (post > 0) {
      res.status(200).json({ message: 'The Post has been Destroyed!'})
    } else {
      res.status().json({ message: "the post with that ID can not be found"})
    }
  } catch (err) {sendUserError(500, "the post could not be removed", err)}
});

// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const { text } = req.body;
//   if (!text) {
//     sendUserError(400, 'Must provide title and contents', res);
//     return;
//   }
//   postDb
//     .insert(id, { text })
//     .then(response => {
//       if (response == 0) {
//         sendUserError(
//           404,
//           'The user with the specified ID does not exist.',
//           res
//         );
//         return;
//       }
//       postDb
//         .getById(id)
//         .then(post => {
//           if (post.length === 0) {
//             sendUserError(404, 'User with that id not found', res);
//             return;
//           }
//           res.json(post);
//         })
//         .catch(error => {
//           sendUserError(500, 'Error looking up user', res);
//         });
//     })
//     .catch(error => {
//       sendUserError(500, 'Something bad happened in the database', res);
//       return;
//     });
// });
router.put('/:id', async (req, res) => {
  try{
    const post = await postDb.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post)
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