const { Op } = require('sequelize');
const ArticleDao = require('../../../src/daos/article/ArticleDao');
const ArticleModel = require('../../../src/models/Article');

jest.mock('../../../src/models/Article');

describe('ArticleDao', () => {
  let dao;
  const mockArticle = {
    id: 1,
    title: 'Test Article',
    content: 'Test Content',
    category: 'Technology',
    source: 'Test News',
    publishedAt: new Date()
  };

  beforeEach(() => {
    ArticleModel.mockClear();
    dao = new ArticleDao();
  });

  describe('findAllWithFilters', () => {
    it('should build correct query for search', async () => {
      const filters = {
        page: 1,
        limit: 10,
        search: 'test',
        category: 'Technology',
        source: 'Test News',
        fromDate: '2024-01-01',
        toDate: '2024-12-31'
      };

      ArticleModel.findAndCountAll.mockResolvedValue({
        rows: [mockArticle],
        count: 1
      });

      await dao.findAllWithFilters(filters);

      expect(ArticleModel.findAndCountAll).toHaveBeenCalledWith({
        where: {
          [Op.or]: [
            { title: { [Op.like]: '%test%' } },
            { content: { [Op.like]: '%test%' } }
          ],
          category: 'Technology',
          source: 'Test News',
          publishedAt: {
            [Op.gte]: new Date('2024-01-01'),
            [Op.lte]: new Date('2024-12-31')
          }
        },
        limit: 10,
        offset: 0,
        order: [['publishedAt', 'DESC']]
      });
    });

    it('should handle empty filters', async () => {
      await dao.findAllWithFilters({});
      
      expect(ArticleModel.findAndCountAll).toHaveBeenCalledWith({
        where: {},
        limit: 10,
        offset: 0,
        order: [['publishedAt', 'DESC']]
      });
    });
  });

  describe('findById', () => {
    it('should call findByPk with ID', async () => {
      ArticleModel.findByPk.mockResolvedValue(mockArticle);
      
      const result = await dao.findById(1);
      
      expect(result).toEqual(mockArticle);
      expect(ArticleModel.findByPk).toHaveBeenCalledWith(1);
    });
  });
});
