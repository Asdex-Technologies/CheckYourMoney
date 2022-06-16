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
  total: number;
  registros = [];
  totales = [];
  opciones = ['Agregar', 'Eliminar'];
  elegido: string;
  saldo: number;
  identificador: string;
  path = 'Usuarios';
  sub = 'Transacciones';
  constructor(private firestore: FirebaseService, private authSvc: AuthService) {
    this.authSvc.stateUser().subscribe(async res =>{
      if(res){
        this.identificador = res.uid;
         this.getDatos();
         this.getTotales();
      }
    })
  }
  ngOnInit(): void {

  } 
  invertirArreglo(array: any){
    this.total = array.length;
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
    });
  }
  getTotales(){
    const sub = 'Totales'
    this.firestore.getSubcollection<Transaction>(this.path, this.identificador, sub).subscribe(res=>{
      if(this.total == 0){
        this.saldo = 0;
      }else{
        this.saldo = res[this.total - 1].cantidad;
      }
    })
  }
  eliminar(id){
    this.firestore.deleteColl(this.path,this.identificador,this.sub,id);
    this.firestore.deleteColl(this.path,this.identificador,'Totales',id);
    console.log('Hola');
  }
}
