const express = require('express');

const router = express.Router();

const db = require('./userDb')

const { get, getById, getUserPosts, insert, remove, update } = db;

/*
@ROOT-ROUTE: "/api/users"
*/

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

/*
@GET: All Users
@PARAMS: none
@ROUTE: "/"
*/

router.get('/', async (req, res) => {
  try {
    const users = await get();

    if (users.length) {
      res.status(200).json(users)

    } else {
      res.status(400).json({message: `No users found`})

    }
  }
  catch (err) {
    res.status(500).json({error: `Unable to retrieve users`})
  }

});

/*
@GET: User
@PARAMS: id[STRING]!
@ROUTE: "/:id"
*/

router.get('/:id', validateUserId, (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user)
});

/*
@GET:  A User's Posts
@PARAMS: id[STRING]!
@ROUTE: "/:id/posts"
*/

router.get('/:id/posts', validateUserId, async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await getUserPosts(id);

    if (posts.length) {
      res.status(200).json(posts);

    } else {
      res.status(200)
         .json({
           message: `User has no posts.`
         })
    }
  }
  catch (err) {
    res.status(500)
       .json({
         error: `Unable to retrieve user's posts.`
       })
  }

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;

  try {
    const user = await getById(id);

    if (user) {
      req.user = user;
      next();

    } else {
      res.status(404).json({message: 'invalid user id'})
    }
  }
  catch (err) {
    res.status(500).json({message: 'server unable to process your request'})
  }

}

function validateUser(req, res, next) {

  if (req.body && Object.keys(req.body).length) {
    next();

  } else {
    res.status(400).json({message: 'missing user data'})
  }

  if (req.body.name !== '') {
    next();

  } else {
    res.status(400).json({message: 'missing required name field'})
  }

}

function validatePost(req, res, next) {

  if (req.body && Object.keys(req.body).length) {
    next();

  } else {
    res.status(400).json({message: 'missing post data'})
  }

  if (req.body.text !== '') {
    next();

  } else {
    res.status(400).json({message: 'missing required text field'})
  }

};

module.exports = router;
