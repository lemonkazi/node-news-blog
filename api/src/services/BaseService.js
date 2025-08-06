class BaseService {
  constructor(dao) {
    if (!dao) throw new Error('DAO instance is required');
    this.dao = dao;
  }

  async findById(id) {
    return this.dao.findById(id);
  }
  
  async findAll(filter = {}) {
    return this.dao.findAll(filter);
  }

  async create(data) {
    return this.dao.create(data);
  }

  async update(id, data) {
    return this.dao.update(id, data);
  }

  async delete(id) {
    return this.dao.delete(id);
  }
}

module.exports = BaseService;
