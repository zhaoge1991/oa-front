export class ReportMonth {
    report_month_id: number;
    user_id: number;
    report_time: string;
    worked: string;
    questions: string;
    new_try: string;
    next_month_plan: string;
    report_month_ranking_id: number;
    month_coefficient: string;
    month_coefficient_content: string;
    created_at: string;
    updated_at: string;
    constructor(reportMonth) {
        if (reportMonth) {
            this.report_month_id = reportMonth.report_month_id;
            this.user_id = reportMonth.user_id;
            this.report_time = reportMonth.report_time;
            this.worked = reportMonth.worked;
            this.questions = reportMonth.questions;
            this.new_try = reportMonth.new_try;
            this.next_month_plan = reportMonth.next_month_plan;
            this.report_month_ranking_id = reportMonth.report_month_ranking_id;
            this.month_coefficient = reportMonth.month_coefficient;
            this.month_coefficient_content = reportMonth.month_coefficient_content;
            this.created_at = reportMonth.created_at;
            this.updated_at = reportMonth.updated_at;
        } else {
            this.report_month_id = 0;
            this.user_id = 0;
            this.report_time = '';
            this.worked = '';
            this.questions = '';
            this.new_try = '';
            this.next_month_plan = '';
            this.report_month_ranking_id = 0;
            this.month_coefficient = '';
            this.month_coefficient_content = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
