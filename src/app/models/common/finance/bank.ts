export class Bank {
    bank_id: number;
    bank_no: string;
    bank_name: string;
    payee: string;
    type: string;
    remark: string;
    created_at: string;
    updated_at: string;
    constructor(bank) {
        if (bank) {
            this.bank_id = bank.bank_id;
            this.bank_no = bank.bank_no
            this.bank_name = bank.bank_name
            this.payee = bank.payee
            this.type = bank.type;
            this.remark = bank.remark
            this.created_at = bank.created_at
            this.updated_at = bank.updated_at
        } else {
            this.bank_id = 0;
            this.bank_no = ''
            this.bank_name = ''
            this.payee = ''
            this.type = ''
            this.remark = ''
            this.created_at = ''
            this.updated_at = ''
        }
    }


}