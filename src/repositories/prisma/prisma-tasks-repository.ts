import { prisma } from "@/lib/prisma";
import { Prisma, Task } from "@prisma/client";
import { TasksRepository } from "../tasks-repository";


export class PrismaTasksRepository implements TasksRepository {
  async create(data: Prisma.TaskCreateInput) {
    const task = await prisma.task.create({
      data
    })

    return task
  }

  async findAll() {
    const tasks = await prisma.task.findMany()
    return tasks
  }

  async findById(id: number) {
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    })

    return task
  }

  async update(id: number, data: Prisma.TaskCreateInput) {
    const task = await prisma.task.update({
      data,
      where: {
        id
      }
    })

    return task
  }

  async deleteById(id: number) {
    await prisma.task.delete({
      where: {
        id
      }
    })
  }

  async completed(id: number, completed_at: Date | null): Promise<Task> {
    const task = await prisma.task.update({
      data: {
        completed_at
      },
      where: {
        id
      }
    })

    return task
  }
}