import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResearchProfileComponent } from './research-profile/research-profile.component';
import { PresentationComponent } from './presentations/presentation/presentation.component';
import { AuthGuard } from 'app/guard/auth.guard';
import { PresentationsComponent } from './presentations/presentations.component';


const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          {path: '', component:DashboardComponent},
          {path: 'investigador', component:ResearchProfileComponent},
          {path: 'perfil', component: UserProfileComponent},
          {path: 'presentaciones', component: PresentationsComponent}
        ],
        canActivate: [AuthGuard] //Activación
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
