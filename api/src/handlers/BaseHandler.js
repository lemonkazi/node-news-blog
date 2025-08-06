class BaseHandler {
  constructor(service) {
    if (!service) throw new Error('Service instance is required');
    this.service = service;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async getAll(req, res) {
    try {
      const { page = 1, limit = 10, search, ...filters } = req.query;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        search,
        filters,
      };

      const result = await this.service.findAll(options);

      const { data, pagination } = Array.isArray(result)
        ? { data: result, pagination: null }
        : result;

      res.json({
        data,
        pagination,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }




  async getById(req, res) {
    try {
      const data = await this.service.findById(req.params.id);
      if (!data) return res.status(404).json({ message: 'Not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const created = await this.service.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await this.service.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async remove(req, res) {
    try {
      await this.service.delete(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = BaseHandler;
