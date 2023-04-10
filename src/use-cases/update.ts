import { TasksRepository } from '@/repositories/tasks-repository'
import { Task } from '@prisma/client'
import { TaskNotExistsError } from './errors/task-not-exists-error'

interface UpdateUseCaseRequest {
  title?: string
  description?: string
}

interface UpdateUseCaseResponse {
  task: Task
}

export class UpdateUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute(id: number, { title, description }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const taskWithId = await this.tasksRepository.findById(id)

    if (!taskWithId) {
      throw new TaskNotExistsError()
    }

    const task = await this.tasksRepository.update(id, { title, description })

    return { task }
  }
}