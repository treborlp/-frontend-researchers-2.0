import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth.service';
import { Usuarios } from 'app/clases/usuarios';
import { PresentationService } from 'app/service/presentation.service';
import { Presentation } from 'app/clases/presentation';
import Swal from 'sweetalert2';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  usuario: Usuarios = new Usuarios();
  newPresentation: Presentation =new Presentation();
  

  constructor(
    private _authService: AuthService,
    private _presentationService: PresentationService,
    public dialoRef: MatDialogRef<PresentationComponent>) 
    {this.usuario.id = this._authService.usuario.id;}

  ngOnInit(): void {
  }


  crearPresentacion(){

    if(this.usuario.id!=null){
      this.newPresentation.usuario = this.usuario;
      this._presentationService.createNewPresentation(this.newPresentation).subscribe(presentation =>{
        this.newPresentation = new Presentation();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Presentación Creada',
          showConfirmButton: false,
          timer: 1500
        });
        this.onClose();
      });
    }else{
      console.log("El usuario debe tener un perfil de investigador.")
    }  
  }

  onClose(){
    this.dialoRef.close();
  }


}
