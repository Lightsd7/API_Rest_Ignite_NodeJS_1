import { Prisma, Task } from '@prisma/client'

export interface TasksRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>
  findAll(): Promise<Task[]>
  findById(id: number): Promise<Task | null>
  update(id: number, data: Prisma.TaskUpdateInput): Promise<Task>
  deleteById(id: number): void
  completed(id: number, completed_at: Date | null): Promise<Task>
}