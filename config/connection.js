const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialsApplication', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;