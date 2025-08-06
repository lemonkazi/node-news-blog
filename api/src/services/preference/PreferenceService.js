const BaseService = require('../../services/BaseService');

class PreferenceService extends BaseService {
  constructor(dao) {
    super(dao);
  }

  async getByUserId(userId) {
    return this.dao.findByUserId(userId);
  }

  async updateForUser(userId, data) {
    return this.dao.upsertByUserId(userId, data);
  }

  // No need to override findAll — inherits from BaseService
}

module.exports = PreferenceService;
