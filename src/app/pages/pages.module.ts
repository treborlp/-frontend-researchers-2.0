import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResearchProfileComponent } from './research-profile/research-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PresentationComponent } from './presentations/presentation/presentation.component';
import { PresentationsComponent } from './presentations/presentations.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ResearchProfileComponent,
    UserProfileComponent,
    PresentationComponent,
    PresentationsComponent
  ],
  exports:[
    DashboardComponent,
    ResearchProfileComponent,
    UserProfileComponent,
    PresentationComponent,
    PresentationsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    RouterModule

  ],
  entryComponents: [PresentationComponent]
})
export class PagesModule { }
