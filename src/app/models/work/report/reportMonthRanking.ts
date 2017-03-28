export class ReportMonthRanking {
    report_month_ranking_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    constructor(reportMonthRanking) {
        if (reportMonthRanking) {
            this.report_month_ranking_id = reportMonthRanking.report_month_ranking_id;
            this.name = reportMonthRanking.name;
            this.created_at = reportMonthRanking.created_at;
            this.updated_at = reportMonthRanking.updated_at;
        } else {
            this.report_month_ranking_id = 0;
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
