import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalState} from '../../../global.state';
import {CurentUserService} from "../../../services/core/currentuser.service";


@Component({
  selector: 'ba-page-top',
  styleUrls: ['./baPageTop.scss'],
  templateUrl: './baPageTop.html',
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public username: string;

  constructor(private _state:GlobalState,private router: Router,private userservice: CurentUserService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.getcurrentuser();
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public getcurrentuser(){
    this.userservice.getuser().subscribe(data=>{
      this.username = data.name;
    })
  }

  //退出登录按钮
  public signout($event){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
