export class TaskStatus {
    task_status_id: number;
    name: string;
    level: number;
    created_at: string;
    updated_at: string;
    constructor(taskStatus) {
        if (taskStatus) {
            this.task_status_id = taskStatus.task_status_id;
            this.name = taskStatus.name;
            this.level = taskStatus.level;
            this.created_at = taskStatus.created_at;
            this.updated_at = taskStatus.updated_at;
        } else {
            this.task_status_id = 0;
            this.name = '';
            this.level = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
