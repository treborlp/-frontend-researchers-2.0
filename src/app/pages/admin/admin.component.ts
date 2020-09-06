import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PositionComponent } from './position/position.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private dialog: MatDialog){ }

  ngOnInit(): void {
  }

  createPosition(){
    const dialogPositionConfig = new MatDialogConfig();
    dialogPositionConfig.disableClose =false;
    dialogPositionConfig.autoFocus =true;
    dialogPositionConfig.width= "50%";
    
    const dialogPositionRef = this.dialog.open(PositionComponent, dialogPositionConfig);

    dialogPositionRef.afterClosed().subscribe(result =>{
      console.log("evento cerrar modal")
    })

  }

}
