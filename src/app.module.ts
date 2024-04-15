import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemController } from './controller/item.controller';

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
export class AppModule {}
