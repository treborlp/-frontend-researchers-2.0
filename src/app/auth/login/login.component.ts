import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { Usuarios } from '../../clases/usuarios';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  usuario: Usuarios;

  constructor(private auth: AuthService, private router: Router ) { 
    this.usuario = new Usuarios();
  }


  ngOnInit(): void {
    let now = moment(); // add this 2 of 4
    //console.log(this.auth.isAuthenticated())
    console.log("today is:"+now.format());
    if(this.auth.isAuthenticated()){
     this.router.navigate(["/dashboard"]);
     console.log("estas autentificado");
    }
   
  }

  
  login(): void{

    //console.log(this.usuario)
    if(this.usuario.username == null || this.usuario.password==null){
      console.log("Debe completar los campos")
    }
    
    this.auth.login(this.usuario).subscribe(response => {
      
      //console.log(response.access_token)
      this.auth.guardarUsuario(response.access_token)
      this.auth.gurdarToken(response.access_token);

      let usuario = this.auth.usuario;
      
     //console.log(usuario);

      this.router.navigate(["/dashboard"]);
    }, error => {
      if(error.status == 400){
        console.log("Error de usuario");
      }
    })
      
  }

}
