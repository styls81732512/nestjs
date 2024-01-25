import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { masterDataSourceConfig } from './core/databases/configs/master-data-source.config';
import { PolicyholdersModule } from './modules/policyholders/policyholders.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => masterDataSourceConfig,
      inject: [ConfigService],
    }),
    PolicyholdersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
