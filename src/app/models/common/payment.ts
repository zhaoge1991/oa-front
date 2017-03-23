export class Payment{
  payment_id: number;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
  fee_name: string;
  cn_name: string;
  info: string;

  constructor(payment) {
    if (payment) {
      this.payment_id = payment.payment_id
      this.name = payment.name
      this.content = payment.content
      this.created_at = payment.created_at
      this.updated_at = payment.updated_at
      this.fee_name = payment.fee_name
      this.cn_name = payment.cn_name
      this.info = payment.info
    }
  }
}
