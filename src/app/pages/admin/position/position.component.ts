import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Position } from 'app/clases/position';
import { PositionService } from 'app/service/position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  cargo : Position = new Position();
  constructor(
    public dialogPositionRef: MatDialogRef<PositionComponent>,
    private positionService: PositionService) { }

  ngOnInit(): void {
  }

  crearNewPosition(){
    this.positionService.create(this.cargo).subscribe(
      response => console.log("success")
    )
  }

  

}
