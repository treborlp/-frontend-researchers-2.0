import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

//Modulos
import { AppRoutingModule } from './app.routing';
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; //Modulo para consumo de peticiones web http
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { NotfoundComponent } from './404/notfound/notfound.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    PagesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule, //Controlador general de rutas 1
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    PagesModule,
    SharedModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
