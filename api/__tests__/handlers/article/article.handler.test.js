const { Op } = require('sequelize');
const ArticleHandler = require('../../../src/handlers/article/article.handler');
const ArticleService = require('../../../src/services/article/ArticleService');
const ArticleDao = require('../../../src/daos/article/ArticleDao');

jest.mock('../../../src/services/article/ArticleService');
jest.mock('../../../src/daos/article/ArticleDao');

describe('Article Handler', () => {
  let mockReq, mockRes, mockNext;
  const mockArticle = { 
    id: 1, 
    title: 'Test Article', 
    content: 'Test Content',
    category: 'Technology',
    source: 'Test News'
  };

  beforeEach(() => {
    mockReq = { 
      params: {},
      body: {},
      user: {
        getUserPreference: jest.fn()
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    ArticleService.mockClear();
  });

  describe('getAll', () => {
    it('should return articles with 200 status', async () => {
      ArticleService.prototype.findAll.mockResolvedValue([mockArticle]);
      
      await ArticleHandler.getAll(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({data:[mockArticle]});
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      ArticleService.prototype.findAll.mockRejectedValue(error);
      
      await ArticleHandler.getAll(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('getById', () => {
    it('should return single article', async () => {
      mockReq.params.id = '1';
      ArticleService.prototype.findById.mockResolvedValue(mockArticle);
      
      await ArticleHandler.getById(mockReq, mockRes);
      
      expect(mockRes.json).toHaveBeenCalledWith(mockArticle);
    });

    it('should handle not found', async () => {
      mockReq.params.id = '999';
      ArticleService.prototype.findById.mockResolvedValue(null);
      
      await ArticleHandler.getById(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe('create', () => {
    it('should create new article', async () => {
      mockReq.body = mockArticle;
      ArticleService.prototype.create.mockResolvedValue(mockArticle);
      
      await ArticleHandler.create(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockArticle);
    });
  });

 

  // Tests for update and remove would follow similar pattern
});
