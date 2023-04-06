import { TasksRepository } from "@/repositories/tasks-repository";
import { Task } from "@prisma/client";

interface TasksUseCaseResponse {
  tasks: Task[]
}

export class FindAllUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute(): Promise<TasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findAll()

    if (!tasks) {
      throw new Error()
    }

    return { tasks }
  }

}