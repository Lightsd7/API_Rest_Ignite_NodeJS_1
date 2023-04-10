import { TasksRepository } from '@/repositories/tasks-repository'
import { Task } from '@prisma/client'
import { TaskNotExistsError } from './errors/task-not-exists-error'

interface CompletedUseCaseResponse {
  task: Task
}

export class CompletedUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute(id: number): Promise<CompletedUseCaseResponse> {
    const task = await this.tasksRepository.findById(id)

    if(!task){
      throw new TaskNotExistsError()
    }

    if (task && task?.completed_at === null) {
      task.completed_at = new Date()
      await this.tasksRepository.completed(id, task.completed_at)
      return { task }
    }

    if (task && task?.completed_at !== null) {
      task.completed_at = null
      await this.tasksRepository.completed(id, task.completed_at)
      return { task }
    }

    throw new Error()
  }
}
