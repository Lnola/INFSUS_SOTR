import { EntityManager, MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockDatabaseModuleConfig } from 'shared/database/database-test.module';
import { PaginationParams } from 'shared/decorators/pagination.decorator';
import { DriverService } from './driver.service';
import Driver from './entities/driver.entity';

const paginationParams: PaginationParams = {
  page: 0,
  pageSize: 10,
  extractParams() {
    return { page: this.page, pageSize: this.pageSize };
  },
};

describe('Integration DriverService', () => {
  let driverService: DriverService;
  let module: TestingModule;
  let em: EntityManager;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [...MockDatabaseModuleConfig, MikroOrmModule.forFeature([Driver])],
      providers: [DriverService],
    }).compile();

    em = module.get(EntityManager);
    driverService = module.get(DriverService);
    const orm = module.get(MikroORM);
    const generator = orm.getSchemaGenerator();
    await generator.clearDatabase();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(driverService).toBeDefined();
  });

  it('should return paginated drivers', async () => {
    const mockDrivers = [
      new Driver('John', 'Doe', '9234567890', new Date(), null),
      new Driver('Jane', 'Doe', '4234567891', new Date(), new Date()),
    ];
    await em.persistAndFlush(mockDrivers);

    expect(await driverService.find(paginationParams)).toEqual({ items: mockDrivers, count: 2 });
  });

  it('should create a driver', async () => {
    const createDriverDto = {
      firstName: 'John',
      lastName: 'Doe',
      contactNumber: '1234567890',
      employmentStartDate: new Date(),
      employmentEndDate: null,
    };

    await driverService.create(createDriverDto);

    const driver = await em.findOne(Driver, { contactNumber: createDriverDto.contactNumber });
    expect(driver).toBeDefined();
  });

  it('should throw an error when creating a driver with an existing contact number', async () => {
    const createDriverDto = {
      firstName: 'John',
      lastName: 'Doe',
      contactNumber: '1234567890',
      employmentStartDate: new Date(),
      employmentEndDate: null,
    };

    await driverService.create(createDriverDto);
    await expect(driverService.create(createDriverDto)).rejects.toThrow(BadRequestException);
  });

  it("should update a driver's details", async () => {
    const driver = new Driver('John', 'Doe', '1234567890', new Date(), null);
    await em.persistAndFlush(driver);
    const savedDriver = await em.findOne(Driver, driver.id);

    const updateDriverDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      contactNumber: '1234567891',
      employmentStartDate: savedDriver.employmentStartDate,
      employmentEndDate: savedDriver.employmentEndDate,
    };

    await driverService.update(driver.id, updateDriverDto);

    const updatedDriver = await em.findOne(Driver, driver.id);
    expect(updatedDriver).toMatchObject(updateDriverDto);
  });

  it("should throw an error when updating a driver's details with an existing contact number", async () => {
    const drivers = [
      new Driver('John', 'Doe', '1234567890', new Date(), null),
      new Driver('Jane', 'Doe', '1234567891', new Date(), null),
    ];
    await em.persistAndFlush(drivers);

    const updateDriverDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      contactNumber: '1234567890',
      employmentStartDate: drivers[1].employmentStartDate,
      employmentEndDate: drivers[1].employmentEndDate,
    };

    await expect(driverService.update(drivers[1].id, updateDriverDto)).rejects.toThrow(BadRequestException);
  });

  it('should delete a driver', async () => {
    const driver = new Driver('John', 'Doe', '1234567890', new Date(), null);
    await em.persistAndFlush(driver);

    await driverService.delete(driver.id);

    const deletedDriver = await em.findOne(Driver, driver.id);
    expect(deletedDriver).toBeNull();
  });
});
