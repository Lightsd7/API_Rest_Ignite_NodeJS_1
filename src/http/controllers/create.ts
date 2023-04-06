import { z } from 'zod'
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository';
import { CreateUseCase } from '@/use-cases/create';


export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    completed_at: z.date().optional()
  })

  const { title, description, completed_at } = createBodySchema.parse(request.body)

  try {
    const prismaTasksRepository = new PrismaTasksRepository()
    const createUseCase = new CreateUseCase(prismaTasksRepository)

    await createUseCase.execute({ title, description, completed_at })
  } catch (error) {
    return reply.status(500).send()
  }

  return reply.status(201).send()
}