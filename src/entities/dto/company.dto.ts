import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDTO {
  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class ResponseCompanyDTO {
  cnpj: string;
  companyName: string;
}