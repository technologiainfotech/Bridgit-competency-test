import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { BrokerApplicationsCreateController } from './create-application.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BrokerApplicationsCreateController],
})
export class BrokerApplicationCreateModule {}
