import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { APPLICATION_REPOSITORY } from 'src/common/constants/repositories';
import { Application } from 'src/models/applications/application.entity';
import { BrokerGuard } from '../../broker.guard';
import { BrokerApplicationsCreateRequestDto, BrokerApplicationsCreateResponseDto } from './create-application.dto';
import { ApplicationStatus } from 'src/enums/application-status.enum';
import { BrokerDto } from 'src/models/brokers/broker.dto';
import User from 'src/common/decorators/user';
import { InternalServerErrorResponseDto } from 'src/common/responses';
import { INTERNAL_SERVER_ERROR } from 'src/common/constants/response-messages';
import { BrokerApplicationsListBadRequestResponseDto } from '../list-applications/list-applications.dto';

@Controller('brokers/applications/create-applications')
@ApiTags('Broker API')
export class BrokerApplicationsCreateController {
  constructor(
    @Inject(APPLICATION_REPOSITORY)
    private applicationEntity: typeof Application,
  ) {}

  @Post('')
  @UseGuards(BrokerGuard)
  @ApiBearerAuth('BROKER')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create applications',
    description: 'Create the applications that the broker has submitted.',
  })
  @ApiOkResponse({
    type: BrokerApplicationsCreateResponseDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
    description: `Returns \`${INTERNAL_SERVER_ERROR}\` when the result could not be computed`,
  })
  async create(
    @User() user: BrokerDto,
    @Body() application: BrokerApplicationsCreateRequestDto,
  ): Promise<BrokerApplicationsCreateResponseDto> {
    const avgLoanAmount = await this.applicationEntity.getAverageLoanAmount();

    await this.applicationEntity.create({
      ...application,
      brokerId: user.id,
      status: ApplicationStatus.Submitted,
    });

    const comparison = application.loanAmount > avgLoanAmount ? 'above' : 'below';

    return {
      success: true,
      message: `The new loan's amount is ${comparison} the average.`,
      averageLoanAmount: avgLoanAmount,
      newLoanAmount: application.loanAmount,
    };
  }
}
