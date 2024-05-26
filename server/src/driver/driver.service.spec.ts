import { Test, TestingModule } from '@nestjs/testing';
import { PaginationParams } from 'shared/decorators/pagination.decorator';
import { DriverService } from './driver.service';

const paginationParams: PaginationParams = {
  page: 0,
  pageSize: 10,
  extractParams() {
    return { page: 0, pageSize: 10 };
  },
};

describe('Unit DriverService', () => {
  let driverService: DriverService;

  const mockDriverRepository = {
    findAndCount: jest.fn().mockResolvedValue([[], 0]),
    getEntityManager: jest.fn().mockReturnValue({ persistAndFlush: jest.fn(), removeAndFlush: jest.fn() }),
    findOne: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: 'DriverRepository',
          useValue: mockDriverRepository,
        },
      ],
    }).compile();

    driverService = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(driverService).toBeDefined();
  });

  it('should call findAndCount method of driverRepository', async () => {
    await driverService.find(paginationParams);
    expect(mockDriverRepository.findAndCount).toHaveBeenCalledWith({}, { offset: 0, limit: 10 });
  });

  it('should call the create method of driverRepository', async () => {
    const createDriverDto = {
      firstName: 'John',
      lastName: 'Doe',
      contactNumber: '1234567890',
      employmentStartDate: new Date(),
      employmentEndDate: new Date(),
    };

    await driverService.create(createDriverDto);
    expect(mockDriverRepository.getEntityManager().persistAndFlush).toHaveBeenCalled();
  });

  it('should call the update method of driverRepository', async () => {
    const updateDriverDto = {
      firstName: 'John',
      lastName: 'Doe',
      contactNumber: '1234567890',
      employmentStartDate: new Date(),
      employmentEndDate: new Date(),
    };

    await driverService.update(1, updateDriverDto);
    expect(mockDriverRepository.getEntityManager().persistAndFlush).toHaveBeenCalled();
  });

  it('should call the delete method of driverRepository', async () => {
    await driverService.delete(1);
    expect(mockDriverRepository.getEntityManager().removeAndFlush).toHaveBeenCalled();
  });
});
