import { Component, OnInit } from '@angular/core';
import { Presentation } from 'app/clases/presentation';
import { PresentationService } from 'app/service/presentation.service';
import { AuthService } from 'app/service/auth.service';
import { ResearcherService } from 'app/service/researcher.service';
import { Researcher } from 'app/clases/researcher';
import { ThrowStmt } from '@angular/compiler';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent implements OnInit {

  newPresentation: Presentation =new Presentation();
  researcherProfile: Researcher = new Researcher();
  idUsuario: number;
  constructor(private _presentationService: PresentationService,
              private _authService: AuthService,
              private _researchService: ResearcherService) { 
    this.idUsuario = this._authService.usuario.id;}

  ngOnInit(): void {
    this.verificarSiTienePerfilInvestigador();
  }

  verificarSiTienePerfilInvestigador(){
    this._researchService.checkResearchProfile(this.idUsuario).subscribe(researcher => {
      if(researcher!=null){
        this.researcherProfile = researcher;
        console.log("el usuario ya tiene perfil")
      }else{
        console.log("el usuario no tiene perfil de investigador")
      }
    })
  }

  crearPresentacion(){
    if(this.researcherProfile.id!=null){
      this.newPresentation.researcher = this.researcherProfile;
      this._presentationService.createNewPresentation(this.newPresentation).subscribe(presentation =>{
        this.newPresentation = new Presentation();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Presentación Creada',
          showConfirmButton: false,
          timer: 1500
        });
        this.listarPresentaciones();
      });
    }else{
      console.log("El usuario debe tener un perfil de investigador.")
    }
    
  }

  listarPresentaciones(){
    if(this.researcherProfile.id!=null){
      this._presentationService.getPresentationById(this.researcherProfile.id).subscribe(presentations => {
        console.log(presentations);
      })     
    }else{
      console.log("No se encuentra el perfil de investigador");
    }
  }

  

}
