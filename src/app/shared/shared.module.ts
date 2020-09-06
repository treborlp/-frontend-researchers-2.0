import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './public/nav/nav.component';
import { PublicFooterComponent } from './public/public-footer/public-footer.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavComponent,
    PublicFooterComponent //Public nav
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavComponent,
    PublicFooterComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class SharedModule { }
