import { Test, TestingModule } from '@nestjs/testing';
import { PaginationParams } from '../shared/decorators/pagination.decorator';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';

describe('DriverController', () => {
  let driverController: DriverController;
  let driverService: DriverService;

  const paginationParams: PaginationParams = {
    page: 1,
    pageSize: 10,
    extractParams() {
      return { page: +this.page, pageSize: +this.pageSize };
    },
  };

  const mockUser = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    contactNumber: '0981953422',
    employmentStartDate: new Date(),
    employmentEndDate: new Date(),
  };

  const mockDriverService = {
    find: jest.fn().mockResolvedValue([mockUser]),
    create: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        {
          provide: DriverService,
          useValue: mockDriverService,
        },
      ],
    }).compile();

    driverController = app.get<DriverController>(DriverController);
    driverService = app.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(driverController).toBeDefined();
  });

  it('should return an array of drivers', async () => {
    expect(await driverController.find(paginationParams)).toStrictEqual([mockUser]);
    expect(driverService.find).toHaveBeenCalledWith(paginationParams);
  });

  it('should create a driver', async () => {
    const createDriverDto: CreateDriverDto = {
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      contactNumber: mockUser.contactNumber,
      employmentStartDate: mockUser.employmentStartDate,
      employmentEndDate: mockUser.employmentEndDate,
    };

    expect(await driverController.create(createDriverDto)).toStrictEqual({ ...createDriverDto, id: 1 });
    expect(driverService.create).toHaveBeenCalledWith(createDriverDto);
  });

  it('should update a driver', async () => {
    const updateDriverDto: CreateDriverDto = {
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      contactNumber: mockUser.contactNumber,
      employmentStartDate: mockUser.employmentStartDate,
      employmentEndDate: mockUser.employmentEndDate,
    };

    expect(await driverController.update(1, updateDriverDto)).toStrictEqual({ ...updateDriverDto, id: 1 });
    expect(driverService.update).toHaveBeenCalledWith(1, updateDriverDto);
  });

  it('should delete a driver', async () => {
    const driverId = 1;

    expect(await driverController.delete(driverId)).toBeUndefined();
    expect(driverService.delete).toHaveBeenCalledWith(driverId);
  });
});
