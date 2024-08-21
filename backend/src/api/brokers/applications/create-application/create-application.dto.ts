import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNumber,
  IsOptional,
  IsPositive,
  IsNotEmpty,
  IsInt,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SuccessResponseDto } from 'src/common/responses';
import { INVALID_MAXIMUM_DATE_ERROR, INVALID_MINIMUM_DATE_ERROR } from 'src/common/constants/response-messages';

export class BrokerApplicationsCreateRequestDto {
  @ApiProperty({
    description: 'Name of the applicant',
    example: 'John Doe',
  })
  @IsString({ message: 'Applicant name must be a string' })
  @IsNotEmpty({ message: 'Applicant name cannot be empty' })
  applicantName: string;

  @ApiProperty({
    description: 'Email address of the applicant',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Applicant email cannot be empty' })
  applicantEmail: string;

  @ApiProperty({
    description: 'Mobile phone number of the applicant',
    example: '+1234567890',
  })
  // @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsNotEmpty({ message: 'Applicant mobile phone number cannot be empty' })
  applicantMobilePhoneNumber: string;

  @ApiProperty({
    description: 'Address of the applicant',
    example: '123 Main St, Springfield',
  })
  @IsString({ message: 'Applicant address must be a string' })
  @IsNotEmpty({ message: 'Applicant address cannot be empty' })
  applicantAddress: string;

  @ApiProperty({
    description: 'Annual income before tax',
    example: 50000,
  })
  @IsNumber({}, { message: 'Annual income must be a number' })
  @Type(() => Number)
  annualIncomeBeforeTax: number;

  @ApiProperty({
    description: 'Incoming address details',
    example: '456 Elm St, Springfield',
  })
  @IsString({ message: 'Incoming address must be a string' })
  incomingAddress: string;

  @ApiProperty({
    description: 'Incoming deposit amount',
    example: 15000,
  })
  @IsNumber({}, { message: 'Incoming deposit must be a number' })
  @Type(() => Number)
  incomingDeposit: number;

  @ApiProperty({
    description: 'Incoming price',
    example: 200000,
  })
  @IsNumber({}, { message: 'Incoming price must be a number' })
  @Type(() => Number)
  incomingPrice: number;

  @ApiProperty({
    description: 'Incoming stamp duty',
    example: 3000,
  })
  @IsNumber({}, { message: 'Incoming stamp duty must be a number' })
  @Type(() => Number)
  incomingStampDuty: number;

  @ApiProperty({
    description: 'Requested loan amount',
    example: 100000,
  })
  @IsNumber({}, { message: 'Loan amount must be a number' })
  @IsPositive({ message: 'Loan amount must be positive' })
  @Type(() => Number)
  loanAmount: number;

  @ApiProperty({
    description: 'Duration of the loan in months',
    example: 24,
  })
  @IsInt({ message: 'Loan duration must be an integer' })
  @IsPositive({ message: 'Loan duration must be positive' })
  @Type(() => Number)
  loanDuration: number;

  @ApiProperty({
    description: 'Monthly expenses',
    example: 1500,
  })
  @IsNumber({}, { message: 'Monthly expenses must be a number' })
  @Type(() => Number)
  monthlyExpenses: number;

  @ApiProperty({
    description: 'Outgoing address details',
    example: '789 Oak St, Springfield',
  })
  @IsString({ message: 'Outgoing address must be a string' })
  outgoingAddress: string;

  @ApiProperty({
    description: 'Outgoing mortgage amount',
    example: 20000,
  })
  @IsNumber({}, { message: 'Outgoing mortgage must be a number' })
  @Type(() => Number)
  outgoingMortgage: number;

  @ApiProperty({
    description: 'Outgoing valuation amount',
    example: 250000,
  })
  @IsNumber({}, { message: 'Outgoing valuation must be a number' })
  @Type(() => Number)
  outgoingValuation: number;

  @ApiProperty({
    description: 'Savings contribution amount',
    example: 10000,
  })
  @IsNumber({}, { message: 'Savings contribution must be a number' })
  @Type(() => Number)
  savingsContribution: number;
}

export class BrokerApplicationsCreateResponseDto extends SuccessResponseDto {
  @IsString()
  message: string;

  @IsNumber()
  averageLoanAmount: number;

  @IsNumber()
  newLoanAmount: number;
}
