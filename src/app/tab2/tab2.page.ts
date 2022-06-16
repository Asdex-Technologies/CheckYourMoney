import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Transaction } from '../models/transaction.model';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  //Variables
  myChart: Chart<"line", any[], any>;
  opciones = ['Agregar', 'Eliminar'];
  i;
  saldo = 0;
  identificador: string;
  path = 'Usuarios';
  sub = 'Transacciones';
  transacciones: Transaction[] = [];
  cantidades = [];
  nombres = [];

  transaccion: Transaction = {
    cantidad: null,
    tipo: null,
    id: null
  }
  total: Transaction = {
    cantidad: null,
    tipo: null,
    id: null
  }
  totales: Transaction[] = [];

  constructor(private firestore: FirebaseService, private authSvc: AuthService){
    
    this.authSvc.stateUser().subscribe(async res =>{
      if(res){
        this.identificador = res.uid;
         this.getsubcollection();
      }
    })

  }

  ngOnInit(): void {
    
  }


  agregar(){
    this.enviarTransacciones();
  }

  getsubcollection(){
    const id = this.identificador;
    const sub = 'Totales'
    this.firestore.getSubcollection<Transaction>(this.path, id, sub).subscribe(res => {
      this.cantidades = res.map(valor => valor.cantidad);
      this.nombres = res.map(valor => valor.tipo);
      this.i = res.length;
      if(this.i == 0){
        this.saldo = 0;
      }else{
        this.saldo = res[this.i - 1].cantidad;
        console.log(this.saldo);
      }
      this.generarGrafico();
    });
  }

  async enviarTransacciones(){
    if(this.transaccion.tipo == null || this.transaccion.cantidad == null){
      console.log('Error');
    }else{
      if(this.transaccion.tipo == 'Eliminar' && this.saldo < this.transaccion.cantidad){
          console.log('No se puede');
      }else{
        console.log(this.transaccion);
        const id = this.identificador;
        
        this.i++;
        const newId = String(this.i);
        this.transaccion.id = newId;
        await this.firestore.subCollection(this.transaccion, this.path, id, this.sub, newId);
        this.enviarTotales();
        this.generarGrafico();
      }
    }
  }

  async enviarTotales() {
    const sub = 'Totales';
    const id = this.identificador;
    
    if(this.transaccion.tipo == null || this.transaccion.cantidad == null){
      console.log('Error');
    }else{
      if(this.transaccion.tipo == 'Agregar'){
        this.saldo = this.saldo + this.transaccion.cantidad;
        this.total.cantidad = this.saldo;
      }else{
        this.saldo = this.saldo - this.transaccion.cantidad;
        this.total.cantidad = this.saldo
      }
      this.total.tipo = this.transaccion.tipo;
      const newId = String(this.i);
      this.total.id = newId;
      await this.firestore.subCollection(this.total,this.path,id,sub,newId);
    }
  }

  generarGrafico(){
    const canvas = <HTMLCanvasElement> document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    if (this.myChart) {
      this.myChart.destroy();
  }
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.nombres,
          datasets: [{
              label: 'Ocultar Grafico',
              data: this.cantidades,

              borderColor: [                 
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

}
