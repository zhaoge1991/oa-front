export class ReportMonthComment {
    month_comment_id: number;
    report_month_id: number;
    user_id: number;
    comment_content: string;
    created_at: string;
    updated_at: string;
    constructor(reportMonthComment) {
        if (reportMonthComment) {
            this.month_comment_id = reportMonthComment.month_comment_id;
            this.report_month_id = reportMonthComment.report_month_id;

            this.user_id = reportMonthComment.user_id;
            this.comment_content = reportMonthComment.comment_content;

            this.created_at = reportMonthComment.created_at;
            this.updated_at = reportMonthComment.updated_at;
        } else {
            this.month_comment_id = 0;
            this.report_month_id = 0;
            this.user_id = 0;
            this.comment_content = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
