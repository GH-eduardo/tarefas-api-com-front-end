import { Request, Response } from 'express'
import taskService from "../services/task.service";

class taskController {
    async create(req: Request, res: Response) {
        const createdTask = await taskService.create(req.body)
        res.status(201)
        return res.json(createdTask)
    }

    async findAll(req: Request, res: Response) {
        const findedTasks = await taskService.findAll()
        res.status(200)
        return res.json(findedTasks)
    }

    async findByTitle(req: Request, res: Response) {
        const findedTask = await taskService.findByTitle(req.params.title)
        res.status(200)
        return res.json(findedTask)
    }
    // async findByTitle(req: Request, res: Response) {
    //     const findedTask = await taskService.findByTitle(req.params.id)
    //     res.status(200)
    //     return res.json(findedTask)
    // }

    async findAllByUserName(req: Request, res: Response) {
        const tasks = await taskService.findAllByUserName(req.params.id);
        res.json(tasks);
    }

    async getCompletedTasks(req: Request, res: Response) {
        const tasks = await taskService.getCompletedTasks();
        res.json(tasks);
    }

    async getPendingTasks(req: Request, res: Response) {
        const tasks = await taskService.getPendingTasks();
        res.json(tasks);
    }

    // async countTasksByUserName(req: Request, res: Response) {
    //     const userId = req.params.id;
    //     const count = await taskService.countTasksByUserName(userId);
    //     res.json(count);
    // }

    async findMostRecentTaskByUserName(req: Request, res: Response) {
        const userId = req.params.id;
        const task = await taskService.findMostRecentTaskByUserName(userId);
        res.json(task);
    }

    async findOldestTaskByUserName(req: Request, res: Response) {
        const userId = req.params.id;
        const task = await taskService.findOldestTaskByUserName(userId);
        res.json(task);
    }

    async findTasksDueInPeriod(req: Request, res: Response) {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        if (typeof startDate === 'string' && typeof endDate === 'string') {
            const tasks = await taskService.findTasksDueInPeriod(new Date(startDate), new Date(endDate));
            return res.json(tasks);
        } else {
            console.log("Invalid date format, expected: yyyy-mm-dd")
        }
    }

    async calculateAverageCompletion(req: Request, res: Response) {
        const averageCompletion = await taskService.calculateAverageCompletion()
        res.status(200)
        return res.json(averageCompletion)
    }

    async findTaskWithLongestDescription(req: Request, res: Response) {
        const task = await taskService.findTaskWithLongestDescription()
        res.status(200)
        return res.json(task)
    }

    async update(req: Request, res: Response) {
        const updatedTask = await taskService.update(req.params.id, req.body)
        res.status(200)
        return res.json(updatedTask)
    }

    async delete(req: Request, res: Response) {
        const deleted = await taskService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }
}

export default new taskController()