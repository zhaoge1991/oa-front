export class Project {
    project_id: number;
    project_name: string;
    config: string;
    created_at: string;
    updated_at: string;
    constructor(project) {
        if (project) {
            this.project_id = project.project_id;
            this.project_name = project.project_name;
            this.config = project.config;
            this.created_at = project.created_at;
            this.updated_at = project.updated_at;
        } else {
            this.project_id = 0;
            this.project_name = '';
            this.config = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
