const BaseDao = require('../../daos/BaseDao');
const PreferenceModel = require('../../models/UserPreference');

class PreferenceDao extends BaseDao {
  constructor() {
    super(PreferenceModel);
  }

  getSearchableFields() {
    return []; // Not searchable; JSON fields can't be searched by LIKE
  }

  async findByUserId(userId) {
    return this.model.findOne({ where: { userId } });
  }

  async upsertByUserId(userId, data) {
    const existing = await this.model.findOne({ where: { userId } });

    if (existing) {
      return existing.update(data);
    } else {
      return this.model.create({ userId, ...data });
    }
  }
}

module.exports = PreferenceDao;
