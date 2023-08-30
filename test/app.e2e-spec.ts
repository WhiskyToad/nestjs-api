import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();

    app.get(PrismaService);

    await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    describe('Signup', () => {
      //TODO
    });
    describe('Signin', () => {
      //TODO
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      //TODO
    });
    describe('edit user', () => {
      //TODO
    });
  });
  describe('Task', () => {
    describe('create task', () => {
      //TODO
    });
    describe('get task', () => {
      //TODO
    });
    describe('get task by id', () => {
      //TODO
    });
    describe('edit task by id', () => {
      //TODO
    });
    describe('delete task by id', () => {
      //TODO
    });
  });
});
