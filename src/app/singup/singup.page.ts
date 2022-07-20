import { Component, OnInit } from '@angular/core';
import { UserR } from '../models/user.model';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  password2 = '';
  img = './assets/CheckYourMoney.png';
  newUser: UserR = {
    nombre: '',
    email: '',
    password: '',
    uid: '',
  }
  constructor(private router: Router, private firestore: FirebaseService, private authSVC: AuthService, private interaction: InteractionService) { }

  ngOnInit() {
    this.authSVC.stateUser().subscribe(res =>{
      if(res){
        console.log('Logeado');
        this.router.navigateByUrl('/tabs/tab1');
      }else{
        console.log('no Logeado');
      }
    })
  }
  async registro(){
    if(this.newUser.nombre == '' || this.newUser.email == '' || this.newUser.password == '' || this.password2 == '' ){
      console.log('Datos vacios');
    }else{
      if(this.newUser.password == this.password2){
        const usuario = await this.authSVC.onRegister(this.newUser).catch( error =>{
          console.log('Error', error);
        })
        if(usuario){
          const path = 'Usuarios';
          const id = usuario.user.uid;
          this.newUser.uid = id;
          const identificador = this.newUser.uid;
          this.newUser.password = null;
          await this.firestore.createDoc(this.newUser,path,identificador);
          this.interaction.presentToast('Registrado con exito');
          this.router.navigateByUrl('/tabs/tab1');
        }

      }else{
        console.log('Contraseñas distintas');
      }
    }
  }
  goTo(){
    this.router.navigateByUrl('/login');
  }
}
