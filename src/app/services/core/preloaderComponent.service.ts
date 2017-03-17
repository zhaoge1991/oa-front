import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/observable';

@Injectable()
export class PreloaderService{

  private toggleSource = new Subject();

  toggle$:Observable<boolean> = this.toggleSource.asObservable();

  putToggle(tog:boolean){
    this.toggleSource.next(tog);
  }

}
