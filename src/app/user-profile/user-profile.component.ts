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
    this.usuario = this._authService.usuario as Usuarios; // Usuarios registrado 
    this.usuario.roles = []; // 
  }

  updateUser(){
    
    this._usuarioService.updateUser(this.usuario).subscribe(usuario =>{
      this.usuario = usuario
      console.log(usuario)
    })
  }

}
