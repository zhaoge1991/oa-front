import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class SupplierRatingService {
  constructor(private http: InterceptorService){}

  private supplier_ratings;

  getsupplier_ratings(): Observable {
    if (this.supplier_ratings) {
      return Observable.of(this.supplier_ratings);
    } else {
      return this.http.get('/api/procurement/supplier_rating').map(
        (response:Response)=> {
          if (response.json()) {
            this.supplier_ratings = response;
            return response;
          }
        }
      )
    }
  }

}
