import {SupplierLevel} from "./supplier/supplierLevel";
import {SupplierDegree} from "./supplier/supplierDegree";
import {SupplierRating} from "./supplier/supplierRating";
import {SupplierStatus} from "./supplier/supplierStatus";
import {Bank} from "../common/finance/bank"
export class ProcurementSupplier {
    procurement_supplier_id: number;
    supplier_no: string;
    full_name: string;
    simple_name: string;
    supplier_level: SupplierLevel;
    account_of: string;
    city: string;
    add: string;
    tel: string;
    fax: string;
    zip_code: string;
    user_id: number;
    supplier_status: SupplierStatus;
    closing_data: string;
    supplier_rating: SupplierRating;
    supplier_degree: SupplierDegree;
    contract_terms: string;
    remark: string;
    tax_registration_no: string;
    created_at: string;
    updated_at: string;
    banks: Bank[];
}