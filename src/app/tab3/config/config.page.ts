import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  datos= [];
  constructor(private firestore: FirebaseService) { }

  ngOnInit() {
    this.getDatos();
  }
  getDatos(){
    this.firestore.getCollection('Redes').subscribe(res=>{
      this.datos = res;
    });
  }
}
