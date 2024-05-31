// src/entites/worker.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Company } from './company.entity';
import { Worker } from './worker.entity';
import { LoanStatus } from './loan-status.entity';

@Entity()
export class PayrollLoan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, company => company.id)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Worker, worker => worker.id)
  @JoinColumn({ name: 'worker_id' })
  worker: Worker;

  @OneToOne(() => LoanStatus)
  @JoinColumn({ name: 'status_id' })
  status: LoanStatus;

  @Column({ name: 'status_details' })
  statusDetails: string;

  @Column({ name: 'next_due' })
  nextDue: Date;

  @Column({ name: 'number_installments' })
  numberInstallments: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'installment_value' })
  installmentValue: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'total_financed' })
  totalFinanced: number;
}
