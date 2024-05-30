export class CreateWorkerDTO {
  name: string;
  cpf: string;
  email: string;
  password: string;
  salary: number;
  score: number;
  companyId: number;
}

export class ResponseWorkerDTO {
  name: string;
  cpf: string;
  salary: number;
}