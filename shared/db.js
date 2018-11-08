// module.exports = {
//   DB: 'mongodb://localhost:27017/nodeservice'
// }

const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../features/user/user.model')
};