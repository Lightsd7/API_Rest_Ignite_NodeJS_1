import fastify from 'fastify'
import { appRoutes } from './http/routes'
// import fileUpload from 'fastify-file-upload'
import multipart from '@fastify/multipart'

export const app = fastify()
app.register(multipart)

app.register(appRoutes)
