import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user.model';
import { UserR } from '../models/user.model';
import { InteractionService } from './interaction.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoged : any = false;
  constructor(private afAuth: AngularFireAuth, private interaction: InteractionService) {
    afAuth.authState.subscribe(user => this.isLoged= user);
   }

   async onLogin(user: User){
    try{
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }
    catch(error){
      console.log('Error en login user', error);
      this.interaction.alertCuenta();
      return error;
    }
  }

  //register
  async onRegister(datos: UserR){
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(datos.email, datos.password);
    }
    catch(error){
      console.log('Error en register user', error);
      this.interaction.alertCuenta();
    }
  }

  stateUser(){
    return this.afAuth.authState;
  }
}
