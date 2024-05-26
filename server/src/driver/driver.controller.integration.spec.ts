import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockDatabaseModuleConfig } from 'shared/database/database-test.module';
import request from 'supertest';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import Driver from './entities/driver.entity';

describe('Integration DriverController (e2e)', () => {
  let app: INestApplication;
  let em: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...MockDatabaseModuleConfig, MikroOrmModule.forFeature([Driver])],

      controllers: [DriverController],
      providers: [DriverService],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    em = module.get(EntityManager);
    const orm = module.get(MikroORM);
    const generator = orm.getSchemaGenerator();
    await generator.clearDatabase();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/drivers (GET) should return an array of drivers', async () => {
    const mockDrivers = [
      new Driver('John', 'Doe', '1234567890', new Date(), null),
      new Driver('Jane', 'Doe', '1234567891', new Date(), new Date()),
    ];
    await em.persistAndFlush(mockDrivers);

    const response = await request(app.getHttpServer()).get('/drivers?page=0&pageSize=10').expect(200);

    expect(response.body.count).toBe(2);
    expect(response.body.items[0].firstName).toBe(mockDrivers[0].firstName);
  });

  it('/drivers (POST) should create a driver', async () => {
    const createDriverDto = {
      firstName: 'John',
      lastName: 'Doe',
      contactNumber: '0981113452',
      employmentStartDate: new Date(),
      employmentEndDate: null,
    };

    await request(app.getHttpServer()).post('/drivers').send({ params: createDriverDto }).expect(201);
  });

  it("/drivers (POST) should return 'Bad Request' if driver with the same contact number already exists", async () => {
    const createDriverDto = {
      firstName: 'John',
      lastName: 'Doe',
      contactNumber: '0981113452',
      employmentStartDate: new Date(),
      employmentEndDate: null,
    };

    await request(app.getHttpServer()).post('/drivers').send({ params: createDriverDto }).expect(201);

    await request(app.getHttpServer()).post('/drivers').send({ params: createDriverDto }).expect(400).expect({
      statusCode: 400,
      message: 'Driver with this contact number already exists!',
      error: 'Bad Request',
    });
  });

  it('/drivers/:id (PUT) should update a driver', async () => {
    const driver = new Driver('John', 'Doe', '1234567890', new Date(), null);
    await em.persistAndFlush(driver);

    const updateDriverDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      contactNumber: '0981113452',
      employmentStartDate: new Date(),
      employmentEndDate: null,
    };

    await request(app.getHttpServer()).put(`/drivers/${driver.id}`).send({ params: updateDriverDto }).expect(200);
  });

  it("/drivers/:id (PUT) should return 'Not Found' if driver doesn't exist", async () => {
    const updateDriverDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      contactNumber: '0981113452',
      employmentStartDate: new Date(),
      employmentEndDate: null,
    };

    await request(app.getHttpServer()).put('/drivers/1').send({ params: updateDriverDto }).expect(404).expect({
      statusCode: 404,
      message: 'Driver not found!',
      error: 'Not Found',
    });
  });

  it("/drivers/:id (PUT) should return 'Bad Request' if driver with the same contact number already exists", async () => {
    const drivers = [
      new Driver('John', 'Doe', '0981113452', new Date(), null),
      new Driver('Jane', 'Doe', '1234567891', new Date(), null),
    ];
    await em.persistAndFlush(drivers);

    const updateDriverDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      contactNumber: '0981113452',
      employmentStartDate: drivers[1].employmentStartDate,
      employmentEndDate: drivers[1].employmentEndDate,
    };

    await request(app.getHttpServer()).put(`/drivers/${drivers[1].id}`).send({ params: updateDriverDto }).expect({
      statusCode: 400,
      message: 'Driver with this contact number already exists!',
      error: 'Bad Request',
    });
  });

  it('/drivers/:id (DELETE) should delete a driver', async () => {
    const driver = new Driver('John', 'Doe', '1234567890', new Date(), null);
    await em.persistAndFlush(driver);

    await request(app.getHttpServer()).delete(`/drivers/${driver.id}`).expect(200);
  });
});
