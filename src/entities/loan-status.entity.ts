// src/entities/loan-status.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoanStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
