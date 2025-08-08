const BaseService = require('../BaseService');
const BaseDao = require('../../daos/BaseDao');
const { Op } = require('sequelize');

jest.mock('../../daos/BaseDao');

describe('BaseService', () => {
  let service;
  const mockDao = new BaseDao();
  const mockData = { id: 1, name: 'Test' };

  beforeEach(() => {
    service = new BaseService(mockDao);
    jest.clearAllMocks();
  });

  test('findById should call dao', async () => {
    mockDao.findById.mockResolvedValue(mockData);
    const result = await service.findById(1);
    expect(mockDao.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  test('findAll should call dao with filters', async () => {
    const filters = { page: 2, limit: 20 };
    mockDao.findAll.mockResolvedValue({ data: [mockData], pagination: filters });
    
    const result = await service.findAll(filters);
    
    expect(mockDao.findAll).toHaveBeenCalledWith(filters);
    expect(result.data).toHaveLength(1);
  });

  test('create should call dao', async () => {
    mockDao.create.mockResolvedValue(mockData);
    const result = await service.create(mockData);
    expect(mockDao.create).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });

  test('update should call dao', async () => {
    mockDao.update.mockResolvedValue(mockData);
    const result = await service.update(1, mockData);
    expect(mockDao.update).toHaveBeenCalledWith(1, mockData);
    expect(result).toEqual(mockData);
  });

  test('delete should call dao', async () => {
    mockDao.delete.mockResolvedValue(true);
    const result = await service.delete(1);
    expect(mockDao.delete).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });
});
