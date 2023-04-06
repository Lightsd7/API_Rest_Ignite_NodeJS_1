import { TasksRepository } from '@/repositories/tasks-repository'
import { Task } from '@prisma/client'

interface CreateUseCaseRequest {
  title: string
  description: string
  completed_at?: Date
}

interface CreateUseCaseResponse {
  task: Task
}


export class CreateUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute({ title, description, completed_at }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const task = await this.tasksRepository.create({ title, description, completed_at })

    return { task }
  }
}