import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../services/firebase.service';
import { UserR } from '../models/user.model';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  path = 'Usuarios';
  name: string;
  id: string;
  constructor(private authSvc: AuthService, private router: Router, private firebase: AngularFireAuth, private firestore: FirebaseService) {
    this.authSvc.stateUser().subscribe(async res =>{
      if(res){
        this.id = res.uid;
        this.getDatos();
      }
    })
  }
  ngOnInit(): void {

  }
  salir(){
    this.firebase.auth.signOut();
    console.log('Sesion cerrada');
    this.router.navigateByUrl('/login');
  }
  getDatos(){
    this.firestore.getDoc<UserR>(this.path, this.id).subscribe( res =>{
      if(res){
        this.name = res.nombre;
        console.log(this.name);
      }
    })
  }
}
