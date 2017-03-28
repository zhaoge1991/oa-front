export class TaskLevel {
    task_level_id: number;
    name: string;
    level: number;
    color: string;
    created_at: string;
    updated_at: string;
    constructor(taskLevel) {
        if (taskLevel) {
            this.task_level_id = taskLevel.task_level_id;
            this.name = taskLevel.name;
            this.level = taskLevel.level;
            this.color = taskLevel.color;
            this.created_at = taskLevel.created_at;
            this.updated_at = taskLevel.updated_at;
        } else {
            this.task_level_id = 0;
            this.name = '';
            this.level = 0;
            this.color = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
