import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  registros = [];
  opciones = ['Agregar', 'Eliminar'];
  elegido: string;
  saldo = 0;
  identificador: string;
  path = 'Usuarios';
  sub = 'Transacciones';
  constructor(private firestore: FirebaseService, private authSvc: AuthService) {
    this.authSvc.stateUser().subscribe(async res =>{
      if(res){
        this.identificador = res.uid;
         this.getDatos();
      }
    })
  }
  ngOnInit(): void {

  } 
  invertirArreglo(array: any){
    console.log(array.length);
    let arregloI = [];
    for(let i = 0; i<array.length; i++){
      arregloI[i] = array[array.length -1 -i];
    }
    return arregloI;
  }

  getDatos(){
    const id = this.identificador;
    this.firestore.getSubcollection<Transaction>(this.path, id, this.sub).subscribe(res => {
      this.registros = this.invertirArreglo(res);
      console.log(this.registros);
    });
    
  }
}
