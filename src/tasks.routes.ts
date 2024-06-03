import { Router } from 'express'
import taskController from './tasks/controllers/task.controller'

const tasks = Router()
tasks.post('/tasks', taskController.create)
tasks.get('/tasks', taskController.findAll)
tasks.get('/tasks/completed', taskController.getCompletedTasks)
tasks.get('/tasks/pending', taskController.getPendingTasks)
tasks.get('/tasks/due-in-period', taskController.findTasksDueInPeriod)
tasks.get('/tasks/average-completion', taskController.calculateAverageCompletion)
tasks.get('/tasks/longest-description', taskController.findTaskWithLongestDescription)
tasks.get('/tasks/title', taskController.findByTitle)
tasks.get('/tasks/user/name', taskController.findAllByUserName)
// tasks.get('/user/name/count', taskController.countTasksByUserName)
tasks.get('/tasks/user/name/most-recent', taskController.findMostRecentTaskByUserName)
tasks.get('/tasks/user/name/oldest', taskController.findOldestTaskByUserName)
tasks.put('/tasks/:id', taskController.update)
tasks.delete('/tasks/:id', taskController.delete)

export {
    tasks
}