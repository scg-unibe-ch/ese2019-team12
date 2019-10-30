import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

<<<<<<< HEAD
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {UserpageComponent } from './userpage/userpage.component';

=======
>>>>>>> 3d5f8f133a08d6eb83fcf08bf619d1c7c9b224dd
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    UserpageComponent
=======
>>>>>>> 3d5f8f133a08d6eb83fcf08bf619d1c7c9b224dd
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
