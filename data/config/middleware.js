const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

module.exports = server => {
  server.use(morgan('dev')); // logger helps with error id
  server.use(helmet()); // helps with security is a must have
  server.use(express.json());
  server.use(cors()); // not sure but did anyways??
}