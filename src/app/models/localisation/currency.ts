export class Currency {
    currency_id: number;
    name: string;
    code: string;
    symbol_left: string;
    symbol_right: string;
    decimal_place: number;
    value: number;
    status: number;
    created_at: string;
    updated_at: string;
    constructor(currency) {
        if (currency) {
            this.currency_id = currency.currency_id;
            this.name = currency.name;
            this.code = currency.code;
            this.symbol_left = currency.symbol_left;
            this.symbol_right = currency.symbol_right;
            this.decimal_place = currency.decimal_place;
            this.value = currency.value;
            this.status = currency.status;
            this.created_at = currency.created_at;
            this.updated_at = currency.updated_at;
        } else {
            this.currency_id = 0;
            this.name = '';
            this.code = '';
            this.symbol_left = '';
            this.symbol_right = '';
            this.decimal_place = 0;
            this.value = 0;
            this.status = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
