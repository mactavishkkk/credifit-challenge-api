import { ApiProperty } from "@nestjs/swagger";

export class CreatePayrollLoanDTO {
  @ApiProperty()
  name: string;

  @ApiProperty({ name: 'company' })
  companyId: number;

  @ApiProperty({ name: 'worker' })
  workerId: number;

  @ApiProperty({ name: 'status' })
  statusId: number;

  @ApiProperty()
  statusDetails: string;

  @ApiProperty()
  nextDue: Date;

  @ApiProperty()
  numberInstallments: number;

  @ApiProperty()
  installmentValue: number;
  
  @ApiProperty()
  totalFinanced: number;

}

export class ResponsePayrollLoanDTO {
}