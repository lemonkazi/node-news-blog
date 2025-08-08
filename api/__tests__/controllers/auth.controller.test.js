const { register } = require('../../src/controllers/auth.controller');
const UserService = require('../../src/services/user/UserService');
const UserDao = require('../../src/daos/user/UserDao');

jest.mock('../../src/services/user/UserService');

const authController = require('../../src/controllers/auth.controller');


describe('Auth Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    UserService.mockClear();
  });

  describe('register', () => {
    it('should register a user and return 201 status', async () => {
      const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
      UserService.prototype.register.mockResolvedValue(mockUser);
      mockReq.body = { name: 'Test User', email: 'test@example.com', password: 'password' };

      await authController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Registered',
        user: mockUser
      });
    });

    it('should handle registration errors', async () => {
      const error = new Error('Registration failed');
      UserService.prototype.register.mockRejectedValue(error);
      mockReq.body = {};

      await authController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Registration failed' });
    });
  });

  describe('login', () => {
    it('should login user and return tokens', async () => {
      const mockData = {
        user: { id: 1, name: 'Test User', email: 'test@example.com' },
        accessToken: 'access-token',
        refreshToken: 'refresh-token'
      };
      UserService.prototype.login.mockResolvedValue(mockData);
      mockReq.body = { email: 'test@example.com', password: 'password' };

      await authController.login(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: 1, name: 'Test User', email: 'test@example.com' }
      });
    });

    it('should handle invalid login credentials', async () => {
      const error = new Error('Invalid credentials');
      UserService.prototype.login.mockRejectedValue(error);
      mockReq.body = {};

      await authController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });
  });

  describe('logout', () => {
    it('should logout user and clear tokens', async () => {
      mockReq.body = { refreshToken: 'refresh-token' };

      await authController.logout(mockReq, mockRes);

      expect(UserService.prototype.logout).toHaveBeenCalledWith('refresh-token');
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Logged out' });
    });

    it('should handle logout errors', async () => {
      const error = new Error('Logout failed');
      UserService.prototype.logout.mockRejectedValue(error);
      mockReq.body = { refreshToken: 'invalid-token' };

      await authController.logout(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Logout failed' });
    });
  });

  describe('refreshToken', () => {
    it('should refresh access token', async () => {
      UserService.prototype.refresh.mockResolvedValue('new-access-token');
      mockReq.body = { refreshToken: 'refresh-token' };

      await authController.refreshToken(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ accessToken: 'new-access-token' });
    });

    it('should handle invalid refresh token', async () => {
      const error = new Error('Invalid refresh token');
      UserService.prototype.refresh.mockRejectedValue(error);
      mockReq.body = { refreshToken: 'invalid-token' };

      await authController.refreshToken(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid refresh token' });
    });
  });
});
