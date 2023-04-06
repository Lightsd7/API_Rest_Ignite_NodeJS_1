import { FastifyInstance } from 'fastify'
import { create } from './controllers/create'
import { findAll } from './controllers/find-all'

export async function appRoutes(app: FastifyInstance) {
  app.get('/tasks', findAll)
  app.post('/tasks', create)
}