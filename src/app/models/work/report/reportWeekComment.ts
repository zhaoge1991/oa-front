export class ReportWeekComment {
    week_comment_id: number;
    report_week_id: number;
    user_id: number;
    comment_content: string;
    created_at: string;
    updated_at: string;
    constructor(reportWeekComment) {
        if (reportWeekComment) {
            this.week_comment_id = reportWeekComment.week_comment_id;
            this.report_week_id = reportWeekComment.report_week_id;

            this.user_id = reportWeekComment.user_id;
            this.comment_content = reportWeekComment.comment_content;

            this.created_at = reportWeekComment.created_at;
            this.updated_at = reportWeekComment.updated_at;
        } else {
            this.week_comment_id = 0;
            this.report_week_id = 0;
            this.user_id = 0;
            this.comment_content = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
