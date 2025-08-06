const { Op } = require('sequelize');

class BaseDao {
  /**
   * @param {Sequelize.Model} model - Sequelize model class
   */
  constructor(model) {
    if (!model) throw new Error('Model is required');
    this.model = model;
  }

  async findById(id) {
    return this.model.findByPk(id);
  }
  
  

  async findAll(filter = {}) {
    const { page = 1, limit = 10, search, filters = {} } = filter;

    const where = {};

    // ✅ Allow filtering only for valid columns
    for (const [key, value] of Object.entries(filters)) {
      if (this.model.rawAttributes.hasOwnProperty(key)) {
        where[key] = value;
      }
    }

    // ✅ Apply dynamic search fields
    const searchableFields = this.getSearchableFields?.() || [];
    if (search && searchableFields.length) {
      where[Op.or] = searchableFields.map((field) => ({
        [field]: { [Op.like]: `%${search}%` },
      }));
    }

    const result = await this.model.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: result.rows,
      pagination: {
        total: result.count,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    };
  }



  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    const record = await this.model.findByPk(id);
    if (!record) throw new Error('Record not found');
    return record.update(data);
  }

  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) throw new Error('Record not found');
    return record.destroy();
  }
}

module.exports = BaseDao;
