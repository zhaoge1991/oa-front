import {User} from "../../user/user";
import {Comment} from "../../common/comment";

export class ReportWeek {
    report_week_id: number;
    user_id: number;
    report_time: string;
    questions: string;
    new_try: string;
    next_week_plan: string;
    week_sales_amount: string;
    month_amount: string;
    sales_aims: string;
    potential_customer:string;
    emphasis_customer:string
    created_at: string;
    updated_at: string;
    user: User;
    comments: Comment[];
    constructor(reportWeek) {
        if (reportWeek) {
            this.report_week_id = reportWeek.report_month_id;
            this.user_id = reportWeek.user_id;
            this.report_time = reportWeek.report_time;
            this.questions = reportWeek.questions;
            this.new_try = reportWeek.new_try;
            this.next_week_plan = reportWeek.next_week_plan;
            this.week_sales_amount = reportWeek.week_sales_amount;
            this.month_amount = reportWeek.month_amount;
            this.sales_aims = reportWeek.sales_aims;
            this.potential_customer = reportWeek.potential_customer;
            this.emphasis_customer = reportWeek.emphasis_customer;
            this.user = new User(reportWeek.user);
            this.comments = [];

            this.created_at = reportWeek.created_at;
            this.updated_at = reportWeek.updated_at;

            for(let comment of reportWeek.comments){
              this.comments.push(new Comment(comment));
            }
        } else {
            this.report_week_id = 0;
            this.user_id = 0;
            this.report_time = '';
            this.questions = '';
            this.new_try = '';
            this.next_week_plan = '';
            this.week_sales_amount ='';
            this.month_amount = '';
            this.sales_aims = '';
            this.potential_customer = '';
            this.emphasis_customer = '';
            this.created_at = '';
            this.updated_at = '';
            this.user = new User(null);
            this.comments = [];
        }

    }
}
