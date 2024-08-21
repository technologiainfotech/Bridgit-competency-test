import { BrokerApplicationCreateModule } from './create-application/create-application.module';
import { BrokerApplicationsListModule } from './list-applications/list-applications.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BrokerApplicationsListModule, BrokerApplicationCreateModule],
})
export class BrokerApplicationsModule {}
