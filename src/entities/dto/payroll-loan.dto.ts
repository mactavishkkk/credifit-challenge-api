import { ApiProperty } from "@nestjs/swagger";

export class CreatePayrollLoanDTO {
  @ApiProperty({ name: 'company' })
  companyId: number;

  @ApiProperty({ name: 'worker' })
  workerId: number;

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