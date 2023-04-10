import { TasksRepository } from "@/repositories/tasks-repository";
import { Task } from "@prisma/client";
import { TaskNotExistsError } from "./errors/task-not-exists-error";

interface TasksUseCaseResponse {
  task: Task
}

export class DeleteUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute(id: number): Promise<TasksUseCaseResponse> {
    const task = await this.tasksRepository.findById(id)

    if (!task) {
      throw new TaskNotExistsError()
    }

    await this.tasksRepository.deleteById(id)

    return { task }
  }

}