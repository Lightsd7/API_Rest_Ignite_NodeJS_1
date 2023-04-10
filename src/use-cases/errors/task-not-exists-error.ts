export class TaskNotExistsError extends Error {
  constructor() {
    super('Task not exists.')
  }
}