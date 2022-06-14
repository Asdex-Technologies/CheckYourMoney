import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(private authSvc: AuthService, private router: Router, private firebase: AngularFireAuth) {}
  ngOnInit(): void {

  }
  salir(){
    this.firebase.auth.signOut();
    console.log('Sesion cerrada');
    this.router.navigateByUrl('/login');
  }
}
