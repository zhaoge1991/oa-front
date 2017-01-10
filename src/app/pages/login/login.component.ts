import {Component, ViewEncapsulation,OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {LoginServices} from './login.services';
import {TextAlertService} from '../../theme/services/textAlert/textAlert.service';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
  providers: [LoginServices]
})
export class Login implements OnInit{

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  returnUrl: string;

  constructor(fb:FormBuilder,private router:Router,private loginservices: LoginServices,private route: ActivatedRoute,private alertService: TextAlertService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }
  ngOnInit(){
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  public onSubmit(value):void {
    this.submitted = true;
    if (this.form.valid) {
      this.loginservices.login(value.email,value.password).subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.alertService.error(error.json().error_description);
          this.submitted = false;
        });
    }
  }

  private goregister(){
    this.router.navigate(['/login']);
  }
}
