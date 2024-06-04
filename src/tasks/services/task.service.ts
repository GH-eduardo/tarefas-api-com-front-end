import taskModel from '../schemas/task.schema'
import { taskType } from '../types/task.type'

class taskService {

    async create(task: taskType) {
        const createdTask = await taskModel.create(task)
        return createdTask
    }

    async findAll() {
        const findedTasks = await taskModel.find()
        return findedTasks
    }

    async findByTitle(title: string) {
        const findedTasks = await taskModel.find({ title: { $regex: title, $options: 'i' } });
        return findedTasks
    }

    async findAllByUserName(author: string) {
        const findedTasks = await taskModel.find({ author: author });
        return findedTasks
    }

    async getCompletedTasks() {
        return taskModel.find({ status: 'concluída' });
    }

    async getPendingTasks() {
        return taskModel.find({ status: 'pendente' });
    }

    async countTasksByUserName(userName: string) {
        const count = await taskModel.countDocuments({ author: userName });
        return 'O usuário ' + userName + ' possui ' + count + ' tarefas registradas';
    }

    async findMostRecentTaskByUserName(userName: string) {
        const task = await taskModel.findOne({ author: userName }).sort({ creation_date: -1 });
        return task;
    }

    async findOldestTaskByUserName(userName: string) {
        const task = await taskModel.findOne({ author: userName }).sort({ creation_date: 1 });
        return task;
    }

    async findTasksCreatedInPeriod(startDate: Date, endDate: Date) {
        const tasks = await taskModel.find({
            creation_date: {
                $gte: startDate,
                $lte: endDate
            }
        });
        return tasks;
    }

    async calculateAverageCompletion() {
        const tasks = await taskModel.find();
        const completedTasks = tasks.filter(task => task.status === 'concluída');
        return ("A média geral de conclusão de tarefas é de: " + (completedTasks.length / tasks.length).toFixed(2) + "%");
    }

    async findTaskWithLongestDescription() {
        const tasks = await taskModel.find();
        let longestDescriptionTask = tasks[0];
        for (let i = 1; i < tasks.length; i++) {
            if (tasks[i].description.length > longestDescriptionTask.description.length) {
                longestDescriptionTask = tasks[i];
            }
        }
        return longestDescriptionTask;
    }

    async update(id: string, task: taskType) {
        const updatedTask = await taskModel.findByIdAndUpdate(id, {
            title: task.title,
            description: task.description,
            creation_date: task.creation_date,
            conclusion_date: task.conclusion_date,
            status: task.status,
            author: task.author
        }, { new: true })

        return updatedTask
    }

    async delete(id: string) {
        try {
            const task = await taskModel.findById(id);
            if (!task) {
                throw new Error('Tarefa não encontrada');
            }

            await taskModel.findByIdAndDelete(id);

            return "Tarefa removida com sucesso";
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover a tarefa: ${error}`);
        }
    }
}

export default new taskService()