import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: User = {
    email: '',
    password: ''
  }


  constructor(private authSvc: AuthService, private router: Router) {
    this.authSvc.stateUser().subscribe(res =>{
      if(res){
        console.log('Logeado');
        this.router.navigateByUrl('/tabs/tab1');
      }else{
        console.log('no Logeado');
      }
    })
   }
  img = './assets/CheckYourMoney.png'
  ngOnInit() {

  }

  async sesion(){
    const user = await this.authSvc.onLogin(this.usuario);
    if(user){
      console.log("sesion iniciada");
      this.router.navigateByUrl('/tabs/tab1');
    }
  }

}
