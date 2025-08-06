const BaseDao = require('../../daos/BaseDao');
const UserModel = require('../../models/User');
const { Op } = require('sequelize');

class UserDao extends BaseDao{
  constructor() {
    super(UserModel);
  }

  getSearchableFields() {
    return ['name', 'email'];
  }
  async findByEmail(email) {
    return this.model.findOne({ where: { email } });
  }
}

module.exports = UserDao;
