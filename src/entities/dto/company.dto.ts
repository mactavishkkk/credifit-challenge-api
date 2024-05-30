export class CreateCompanyDTO {
  cnpj: string;
  companyName: string;
  email: string;
  password: string;
}

export class ResponseCompanyDTO {
  cnpj: string;
  companyName: string;
}