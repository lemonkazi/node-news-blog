const ArticleService = require('../../../src/services/article/ArticleService');
const ArticleDao = require('../../../src/daos/article/ArticleDao');

jest.mock('../../../src/daos/article/ArticleDao');

describe('ArticleService', () => {
  let service;
  const mockArticle = { 
    id: 1, 
    title: 'Test Article', 
    content: 'Test Content',
    category: 'Technology',
    source: 'Test News'
  };

  beforeEach(() => {
    ArticleDao.mockClear();
    service = new ArticleService(new ArticleDao());
  });

  describe('findAll', () => {
    it('should pass filters to DAO', async () => {
      const filters = {
        page: 2,
        limit: 20,
        //search: 'test',
        //category: 'Tech'
        //source: 'Test News'
      };

      ArticleDao.prototype.findAllWithFilters.mockResolvedValue({
        data: [mockArticle],
        pagination: { page: 2, limit: 20, total: 1 }
      });

      const result = await service.findAll(filters);

      expect(ArticleDao.prototype.findAllWithFilters).toHaveBeenCalledWith(filters);
      expect(result.data).toHaveLength(1);
      expect(result.pagination.page).toBe(2);
    });
  });

  describe('findById', () => {
    it('should get single article by ID', async () => {
      ArticleDao.prototype.findById.mockResolvedValue(mockArticle);
      
      const result = await service.findById(1);
      
      expect(result).toEqual(mockArticle);
      expect(ArticleDao.prototype.findById).toHaveBeenCalledWith(1);
    });
  });
});
