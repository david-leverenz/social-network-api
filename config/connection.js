// Connection file requiring mongoose and indicating the path to the database.
const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/socialNetworkApi');

module.exports = connection;