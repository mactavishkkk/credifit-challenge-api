import { ApiProperty } from "@nestjs/swagger";

export class CreateWorkerDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  salary: number;

  @ApiProperty()
  score: number;

  @ApiProperty({ name: 'company' })
  companyId: number;
}

export class ResponseWorkerDTO {
  name: string;
  cpf: string;
  salary: number;
}