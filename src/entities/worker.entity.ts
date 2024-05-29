// src/entites/worker.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @ManyToOne(() => Company, company => company.workers)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
