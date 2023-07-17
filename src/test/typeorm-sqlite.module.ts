import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class TypeormSqliteModule {}
