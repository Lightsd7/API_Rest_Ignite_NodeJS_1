import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";
import { TaskNotExistsError } from "@/use-cases/errors/task-not-exists-error";
import { FindByIdUseCase } from "@/use-cases/find-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const idBodySchema = z.object({
    id: z.string()
  })

  const { id } = idBodySchema.parse(request.params)

  try {
    const prismaTasksRepository = new PrismaTasksRepository()
    const findByIdUseCase = new FindByIdUseCase(prismaTasksRepository)
    const task = await findByIdUseCase.execute(Number(id))
    return reply.status(200).send({ task })

  } catch (error) {
    if (error instanceof TaskNotExistsError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}