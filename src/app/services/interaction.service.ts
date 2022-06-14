import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import { FirebaseService } from './firebase.service';
@Injectable({
    providedIn: 'root'
  })
  export class InteractionService {
    loading: any;
    msg: string;
    constructor(public toastController: ToastController,
                 public loadingController: LoadingController,
                 private alertCtrl: AlertController,
                 private firebase: FirebaseService) { }
  
    async presentToast(mensaje: string) {
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 2000
      });
      toast.present();
    }
  
    async presentLoading() {
      this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Guardando...',
      });
      await this.loading.present();
    }
  
    async closeLoading() {
      await this.loading.dismiss();
    }
  
    async alertCuenta(){
      const alertElement = await this.alertCtrl.create({
        header: 'Datos incorrectos o incompletos, vuelve a intentarlo',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      await alertElement.present();
    }
  }