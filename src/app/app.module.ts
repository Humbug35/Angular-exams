import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { HandleloadService } from './handleload.service';

const appRoutes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide:
    HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true },
    DataService,
    AuthService,
    FirebaseService,
    HandleloadService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
