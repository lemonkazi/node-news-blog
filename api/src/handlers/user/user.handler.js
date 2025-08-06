const BaseHandler = require('../../handlers/BaseHandler');
const UserService = require('../../services/user/UserService');
const UserDao = require('../../daos/user/UserDao');

const service = new UserService(new UserDao());

class UserHandler extends BaseHandler {
  constructor(service) {
    super(service);
  }
  // You can extend with other methods like profile, status toggle, etc.
}

module.exports = new UserHandler(service);
