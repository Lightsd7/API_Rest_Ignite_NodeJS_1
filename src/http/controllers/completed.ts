import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";
import { CompletedUseCase } from "@/use-cases/completed";
import { TaskNotExistsError } from "@/use-cases/errors/task-not-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function completed(request: FastifyRequest, reply: FastifyReply) {
  const idBodySchema = z.object({
    id: z.string()
  })

  const { id } = idBodySchema.parse(request.params)

  try {
    const prismaTasksRepository = new PrismaTasksRepository()
    const completedUseCase = new CompletedUseCase(prismaTasksRepository)
    const task = await completedUseCase.execute(Number(id))
    return reply.status(204).send()

  } catch (error) {
    if (error instanceof TaskNotExistsError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}