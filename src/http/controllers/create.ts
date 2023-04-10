import { z } from 'zod'
import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'
import { CreateUseCase } from '@/use-cases/create'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import { parse } from 'csv-parse'

export async function create(request: FastifyRequest, reply: FastifyReply) {

  const pump = util.promisify(pipeline)
  const file = await request.file()

  if (file) {
    await pump(file.file, fs.createWriteStream(`./uploads/${file.filename}`, { encoding: "utf-8" }))
    const parseStream = fs.createReadStream(`./uploads/${file.filename}`)
      .pipe(parse({ delimiter: ",", from_line: 2 }))

    for await (const line of parseStream) {
      const [title, description] = line
      try {
        const prismaTasksRepository = new PrismaTasksRepository()
        const createUseCase = new CreateUseCase(prismaTasksRepository)

        await createUseCase.execute({ title, description })
      } catch (error) {
        return reply.status(500).send()
      }
    }
    return reply.status(201).send()
  }

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