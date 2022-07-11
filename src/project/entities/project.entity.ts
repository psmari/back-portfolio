import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'project' })
export class Project {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'name', nullable: false })
  nome: string;

  @Column({ name: 'link', nullable: true })
  link: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: string;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: string;
}
