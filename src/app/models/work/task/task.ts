export class Task {
    task_id: number;
    name: string;
    source_user_id: number;
    type_id: number;
    date_complete: string;
    task_level_id: number;
    description: string;
    date_added: string;
    task_status_id: number;
    deadline: string;
    task_type_id: number;
    is_cron: number;
    created_at: string;
    updated_at: string;
    constructor(task) {
        if (task) {
            this.task_id = task.task_id;
            this.name = task.name;
            this.source_user_id = task.source_user_id;
            this.type_id = task.type_id;
            this.date_complete = task.date_complete;
            this.task_level_id = task.task_level_id;
            this.description = task.description;
            this.date_added = task.date_added;
            this.task_status_id = task.task_status_id;
            this.deadline = task.deadline;
            this.task_type_id = task.task_type_id;
            this.is_cron = task.is_cron;
            this.created_at = task.created_at;
            this.updated_at = task.updated_at;
        } else {
            this.task_id = 0;
            this.name = '';
            this.source_user_id = 0;
            this.type_id = 0;
            this.date_complete = '';
            this.task_level_id = 0;
            this.description = '';
            this.date_added = '';
            this.task_status_id = 0;
            this.deadline = '';
            this.task_type_id = 0;
            this.is_cron = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
