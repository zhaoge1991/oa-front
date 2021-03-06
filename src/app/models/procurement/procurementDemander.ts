import {Bank} from "../common/finance/bank"
export class ProcurementDemander {
    procurement_demander_id: number;
    full_name: string;
    simple_name: string;
    add: string;
    tel: string;
    fax: string;
    zip_code: string;
    remark: string;
    tax_registration_no: string;
    created_at: string;
    updated_at: string;
    banks: Bank[]
    constructor(procurementDemander) {
        if (procurementDemander) {
            this.procurement_demander_id = procurementDemander.procurement_demander_id;
            this.full_name = procurementDemander.full_name;
            this.simple_name = procurementDemander.simple_name
            this.add = procurementDemander.add
            this.tel = procurementDemander.tel
            this.fax = procurementDemander.fax
            this.zip_code = procurementDemander.zip_code
            this.remark = procurementDemander.remark
            this.tax_registration_no = procurementDemander.tax_registration_no
            this.created_at = procurementDemander.created_at
            this.updated_at = procurementDemander.updated_at
            this.banks = [];
            if (procurementDemander.banks) {
                for (let bank of procurementDemander.banks) {
                    this.banks.push(new Bank(bank));
                }
            }
        }


    }

    addBank(demanderBank: Bank) {
        this.banks.push(demanderBank);

    }
    deleteBank(index) {
        this.banks.splice(index, 1)
    }

}