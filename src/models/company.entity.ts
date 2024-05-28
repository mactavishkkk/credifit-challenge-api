// src/models/company.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Worker } from './worker.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  companyName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwords: string;

  @OneToMany(() => Worker, worker => worker.company)
  workers: Worker[];
}
