import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { HandleloadService } from './handleload.service';
import { ItemComponentComponent } from './item-component/item-component.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { UploadComponent } from './upload/upload.component';
import { StarComponent } from './star/star.component';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/search.component';

const appRoutes: Routes = [
  { path: '', canActivate: [AuthService], component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', canActivate: [AuthService], component: MainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavigationComponent,
    ItemComponentComponent,
    BreadcrumbComponent,
    UploadComponent,
    StarComponent,
    UserComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DataService,
    AuthService,
    FirebaseService,
    HandleloadService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
