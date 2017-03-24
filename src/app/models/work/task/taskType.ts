export class TaskType {
    task_type_id: number;
    name: string;
    level: number;
    created_at: string;
    updated_at: string;
    constructor(taskType) {
        if (taskType) {
            this.task_type_id = taskType.task_type_id;
            this.name = taskType.name;
            this.level = taskType.level;
            this.created_at = taskType.created_at;
            this.updated_at = taskType.updated_at;
        } else {
            this.task_type_id = 0;
            this.name = '';
            this.level = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
