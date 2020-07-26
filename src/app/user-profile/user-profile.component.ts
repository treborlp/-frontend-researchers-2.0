import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth.service';
import { Usuarios } from 'app/clases/usuarios';
import { UsuarioService } from 'app/service/usuario.service';
import { HttpEventType } from '@angular/common/http';
import { URL_BACKEND } from 'app/config/config';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  usuario: Usuarios = new Usuarios();
  idUsername: number;
  //Variables para subir imagen
  private fotoSeleccionada: File;
  progresoSubidoFoto:number =0;
  url_backend: string = URL_BACKEND; 
  
  constructor(private _authService: AuthService, private _usuarioService: UsuarioService) {
    this.idUsername = this._authService.usuario.id;
  }

  ngOnInit() {
    this._usuarioService.findUserById(this.idUsername).subscribe(usuario => this.usuario = usuario)
      
  }

  updateUser(){
    this.usuario.roles = []; // Only for user purpose
    this._usuarioService.updateUser(this.usuario).subscribe(usuario =>{
      this.usuario = usuario;
      console.log(this.usuario);
    })
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progresoSubidoFoto = 0;
    console.log(this.fotoSeleccionada)
    if(this.fotoSeleccionada.type.indexOf("image")<0){
      this.fotoSeleccionada = null;
      console.log("Archivo no permitido");
    }

  }

  subirFoto():void{
    if(!this.fotoSeleccionada){
      console.log("debe seleccionare una foto antes de subir")
    }else{
      this._usuarioService.subirFoto(this.fotoSeleccionada, this.usuario.id).subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progresoSubidoFoto = Math.round((event.loaded/event.total)*100);
          }else if(event.type === HttpEventType.Response){
            let response: any = event.body;
            this.usuario = response.usuario as Usuarios;
            console.log(this.usuario);   
          }
        }
      )
    }
    
  }

}
