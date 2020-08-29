import { Component, OnInit } from '@angular/core';
import { Researcher } from 'app/clases/researcher';
import { Usuarios } from 'app/clases/usuarios';
import { AuthService } from 'app/service/auth.service';
import { ResearcherService } from 'app/service/researcher.service';
import { UsuarioService } from 'app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-research-profile',
  templateUrl: './research-profile.component.html',
  styleUrls: ['./research-profile.component.css']
})
export class ResearchProfileComponent implements OnInit {

  idUsuario: number;
  investigador: Researcher = new Researcher();
  

  constructor(private _authService: AuthService, 
    private _researchService: ResearcherService,
    private _userService: UsuarioService) {
    this.idUsuario = this._authService.usuario.id;
   }

  ngOnInit(): void {
  // this.verificarSiTienePerfilInvestigador();
  }

  verificarSiTienePerfilInvestigador(){
    this._researchService.checkResearchProfile(this.idUsuario).subscribe(researcher => {
      if(researcher!=null){
        this.investigador = researcher;
        console.log("el usuario ya tiene perfil")
      }else{
        console.log("el usuario no tiene perfil de investigador")
      }
    })
  }

  crearPerfildeInvestigador(){

    let usuarioActual: Usuarios = new Usuarios(); //creamos un objeto investigador
    usuarioActual.id = this.idUsuario; // Asignamos el Id del usuario actual de la session al usuario
    this.investigador.usuario = usuarioActual; //Asignamos el objeto usuario al objeto investigador
    
    this._researchService.createResearcher(this.investigador).subscribe(newResearcher =>{
        this.investigador = newResearcher;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
    })
  }

  actualizarPerfildeInvestigador(){
    this._researchService.updateResearcher(this.investigador).subscribe(updateResearcher =>{
      this.investigador = updateResearcher;
    })
  }

}
