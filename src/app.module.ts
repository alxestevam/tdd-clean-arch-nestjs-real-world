import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from './config/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(mysqlConfig), AuthModule],
})
export class AppModule {}
