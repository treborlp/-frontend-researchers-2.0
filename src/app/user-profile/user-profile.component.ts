import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth.service';
import { Usuarios } from 'app/clases/usuarios';
import { UsuarioService } from 'app/service/usuario.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  usuario: Usuarios = new Usuarios();
  
  constructor(private _authService: AuthService, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario.id = this._authService.usuario.id;
    this.usuario.nombre = this._authService.usuario.nombre;
    this.usuario.primerApellido = this._authService.usuario.primerApellido;
    this.usuario.segundoApellido = this._authService.usuario.segundoApellido;
   // this.usuario.roles = this._authService.usuario.roles;
    this.usuario.telefono = this._authService.usuario.telefono;
    this.usuario.enabled = this._authService.usuario.enabled;
    this.usuario.username = this._authService.usuario.username;
    this.usuario.email = this._authService.usuario.email;


    console.log(this.usuario);
  }

  updateUser(){
    
    this._usuarioService.updateUser(this.usuario).subscribe(usuario =>{
      this.usuario = usuario
      console.log(this.usuario)
    })
  }

}
