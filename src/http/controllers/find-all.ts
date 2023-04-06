import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";
import { FindAllUseCase } from "@/use-cases/find-all";
import { FastifyReply, FastifyRequest } from "fastify";


export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaTasksRepository = new PrismaTasksRepository()
    const findAllUseCase = new FindAllUseCase(prismaTasksRepository)
    const tasks = await findAllUseCase.execute()
    return reply.status(200).send({ tasks })

  } catch (error) {
    return reply.status(400).send()
  }
}