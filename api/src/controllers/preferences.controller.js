const UserPreference = require('../models/UserPreference');

const getPreferences = async (req, res) => {
  try {
    const pref = await UserPreference.findOne({ where: { userId: req.user.id } });
    res.json(pref || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const setPreferences = async (req, res) => {
  try {
    const { sources, categories, authors } = req.body;

    const [pref, created] = await UserPreference.findOrCreate({
      where: { userId: req.user.id },
      defaults: { sources, categories, authors },
    });

    if (!created) {
      await pref.update({ sources, categories, authors });
    }

    res.json(pref);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPreferences, setPreferences };
