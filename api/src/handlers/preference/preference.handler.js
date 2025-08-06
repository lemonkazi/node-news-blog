const BaseHandler = require('../../handlers/BaseHandler');
const PreferenceService = require('../../services/preference/PreferenceService');
const PreferenceDao = require('../../daos/preference/PreferenceDao');

const service = new PreferenceService(new PreferenceDao());

class PreferenceHandler extends BaseHandler {
  constructor(service) {
    super(service);
    this.getMine = this.getMine.bind(this);
    this.setMine = this.setMine.bind(this);
  }

  async getMine(req, res) {
    try {
      const prefs = await this.service.getByUserId(req.user.id);
      res.json(prefs || {});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async setMine(req, res) {
    try {
      const updated = await this.service.updateForUser(req.user.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new PreferenceHandler(service);
