export class Quantifier {
    quantifier_id: number;
    code: string;
    description: string;
    created_at: string;
    updated_at: string;
    constructor(quantifier) {
        if (quantifier) {
            this.quantifier_id = quantifier.quantifier_id;
            this.code = quantifier.code;
            this.description = quantifier.description;
            this.created_at = quantifier.created_at;
            this.updated_at = quantifier.updated_at;
        } else {
            this.quantifier_id = 0;
            this.code = '';
            this.description = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
