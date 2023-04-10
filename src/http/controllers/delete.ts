import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";
import { DeleteUseCase } from "@/use-cases/delete";
import { TaskNotExistsError } from "@/use-cases/errors/task-not-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {
  const idBodySchema = z.object({
    id: z.string()
  })

  const { id } = idBodySchema.parse(request.params)

  try {
    const prismaTasksRepository = new PrismaTasksRepository()
    const deleteUseCase = new DeleteUseCase(prismaTasksRepository)
    await deleteUseCase.execute(Number(id))
    return reply.status(204).send()

  } catch (error) {
    if (error instanceof TaskNotExistsError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}