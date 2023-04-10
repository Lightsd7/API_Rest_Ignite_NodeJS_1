import { z } from 'zod'
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository';
import { UpdateUseCase } from '@/use-cases/update';
import { TaskNotExistsError } from '@/use-cases/errors/task-not-exists-error';


export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional()
  })

  const updateParamsSchema = z.object({
    id: z.string()
  })

  const { title, description } = updateBodySchema.parse(request.body)
  const { id } = updateParamsSchema.parse(request.params)

  try {
    const prismaTasksRepository = new PrismaTasksRepository()
    const updateUseCase = new UpdateUseCase(prismaTasksRepository)

    await updateUseCase.execute(Number(id), { title, description })

  } catch (error) {
    if (error instanceof TaskNotExistsError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(204).send()
}