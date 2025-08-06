const UserService = require('../services/user/UserService');
const UserDao = require('../daos/user/UserDao');
const service = new UserService(new UserDao());

const register = async (req, res) => {
  try {
    const user = await service.register(req.body);
    res.status(201).json({ message: 'Registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await service.login(req.body);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await service.logout(refreshToken);
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await service.refresh(refreshToken);
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { register, login, logout, refreshToken };