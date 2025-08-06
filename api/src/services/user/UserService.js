const BaseService = require('../../services/BaseService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../../models/RefreshToken');


class UserService extends BaseService {
  constructor(dao) {
    super(dao);
  }

  async register(data) {
    const existing = await this.dao.findByEmail(data.email);
    if (existing) throw new Error('Email already exists');

    const hashed = await bcrypt.hash(data.password, 10);
    return this.dao.create({ ...data, password: hashed });
  }

  async login({ email, password }) {
    const user = await this.dao.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRY }
    );

    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + ms(process.env.JWT_REFRESH_EXPIRY)),
    });

    return { user, accessToken, refreshToken };
  }

  async refresh(oldToken) {
    const stored = await RefreshToken.findOne({ where: { token: oldToken } });

    if (!stored || stored.revoked) throw new Error('Invalid refresh token');

    const payload = jwt.verify(oldToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign({ id: payload.id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRY,
    });

    return newAccessToken;
  }

  async logout(token) {
    const stored = await RefreshToken.findOne({ where: { token } });
    if (stored) await stored.update({ revoked: true });
  }
}


module.exports = UserService;
