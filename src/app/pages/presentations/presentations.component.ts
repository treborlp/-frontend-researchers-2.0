import { Component, OnInit, ViewChild } from '@angular/core';
import { Presentation } from 'app/clases/presentation';
import { PresentationService } from 'app/service/presentation.service';
import { AuthService } from 'app/service/auth.service';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import { Usuarios } from 'app/clases/usuarios';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PresentationComponent } from './presentation/presentation.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent implements OnInit {

  newPresentation: Presentation =new Presentation();
  presentations: Presentation[];
  usuario: Usuarios = new Usuarios();
  controlEdit: boolean = false;
  searchKey: string;
  listData: MatTableDataSource<Presentation>;
  displayColumns: string[] = ['ID','title','fechaPresentacion', 'url','actions']; 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _presentationService: PresentationService,
              private _authService: AuthService,
              private dialog: MatDialog) { 
    this.usuario.id = this._authService.usuario.id;}

  ngOnInit(): void {
   this.listarPresentaciones();
  }

  
  listarPresentaciones(){
    if(this.usuario.id!=null){
      this._presentationService.getPresentationById(this.usuario.id).subscribe(presentations => {
        this.listData = new MatTableDataSource(presentations);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
       // this.presentations = presentations;
      })     
    }else{
      console.log("No se encuentra el perfil de investigador");
    }
  }


  onCreateNew(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false; //Desabilitar cierre de modal con el click en la parte sombreada
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";

    const dialogRef = this.dialog.open(PresentationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.listarPresentaciones();
    })

  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  

  
  
}
