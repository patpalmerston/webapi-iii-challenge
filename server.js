const express = require(`express`);
const configureMiddleware = require('././data/config/middleware')
const postsRouter = require('./data/routers/posts-router.js');
const usersRouter = require('./data/routers/users-router.js');


const server = express();

//middleware - using middleware.js instead this is not needed----
// const morgan = require('morgan');
// const helmet = require('helmet');
// const cors = require('cors');

//middleware
configureMiddleware(server);

//apply middleware - using middleware.js instead this is not needed----
// server.use(morgan('dev')); // logger helps with error id
// server.use(helmet()); // helps with security is a must have
// server.use(express.json());//dubplicate
// server.use(cors()); // not sure but did anyways??



// server.use(express.json());//duplicate this is in middleware.js or apply middleware above
server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.send(`
    <h2>Web Api III Challenge</h2>
    <p>Welcome to the Thunderdome<p>
  `);
});

// function userName(req, res, next) {
//     const capitalName = req.headers.name.charAt(0).toUpperCase().slice(1);
//     if (capitalName) {
//       next();
//     } else {
//       res.status(401).json({ message: 'Name is not Capitalized!' })
//     }
    
//   }


module.exports = server;