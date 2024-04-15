import { HttpException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemController } from './controller/item.controller';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'eato',
      entities: [Item],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [ItemController],
})
export class AppModule {
  constructor() {
    console.log('Connected to the database successfully');
  }
}
