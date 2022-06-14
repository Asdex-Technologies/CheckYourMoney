import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable, of } from 'rxjs';
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
    tipo: null
  }
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


  async agregar(){
    if(this.transaccion.tipo == undefined && this.transaccion.cantidad == null){
      console.log('Error');
    }else{
      console.log(this.transaccion);
      const id = this.identificador;
      this.i++;
      const newId = String(this.i);
      await this.firestore.subCollection(this.transaccion, this.path, id, this.sub, newId);
      console.log('Hecho');
      this.generarGrafico();
    }
  }

  getsubcollection(){
    const id = this.identificador;
    this.firestore.getSubcollection<Transaction>(this.path, id, this.sub).subscribe(res => {
      this.cantidades = res.map(valor => valor.cantidad);
      this.nombres = res.map(valor => valor.tipo);
      this.i = res.length;
      console.log('Tamaño arreglo ->' + this.i);
      this.generarGrafico();
    });
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
