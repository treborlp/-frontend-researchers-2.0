import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResearchProfileComponent } from './research-profile/research-profile.component';
import { AuthGuard } from 'app/guard/auth.guard';
import { PresentationsComponent } from './presentations/presentations.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          {path: '', component:DashboardComponent},
          {path: 'investigador', component:ResearchProfileComponent},
          {path: 'perfil', component: UserProfileComponent},
          {path: 'presentaciones', component: PresentationsComponent},
          {path: 'admin', component: AdminComponent}
        ],
        canActivate: [AuthGuard] //Activación
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
