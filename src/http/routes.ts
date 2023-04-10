import { FastifyInstance } from 'fastify'
import { completed } from './controllers/completed'
import { create } from './controllers/create'
import { deleteById } from './controllers/delete'
import { findAll } from './controllers/find-all'
import { findById } from './controllers/find-by-id'
import { update } from './controllers/update'

export async function appRoutes(app: FastifyInstance) {
  app.get('/tasks', findAll)
  app.get('/tasks/:id', findById)
  app.post('/tasks', create)
  app.put('/tasks/:id', update)
  app.delete('/tasks/:id', deleteById)
  app.patch('/tasks/:id/complete', completed)
}