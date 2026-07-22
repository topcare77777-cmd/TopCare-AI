/**
 * TopCare AI Platform V2.0.0
 * Task Scheduler
 * Path: assets/js/core/task.scheduler.js
 */
import Logger from './logger.js';

const TaskScheduler = {
    tasks: [],

    run(task, delay) {
        const id = setTimeout(task, delay);
        this.tasks.push(id);
        return id;
    },

    clearAll() {
        this.tasks.forEach(id => clearTimeout(id));
        this.tasks = [];
        Logger.info("[TaskScheduler] All scheduled tasks cleared.");
    }
};

export default TaskScheduler;