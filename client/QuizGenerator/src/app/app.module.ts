import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenHomeComponent } from './home-screen/home/home-screen-home.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {
  HomeScreenLoginComponent,
  LoginDialogComponent,
  RegisterDialogComponent,
} from './home-screen/login/home-screen-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { BasicAuthInterceptor } from './shared/helpers/basic-auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { reducers } from './shared/app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './home-screen/dashboard/dashboard.component';
import { DashboardMainScreenComponent } from './home-screen/dashboard/main-screen/dashboard-main-screen.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardNewQuestionnaireComponent } from './home-screen/dashboard/new-questionnaire/dashboard-new-questionnaire.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DashboardMyQuestionnairesComponent } from './home-screen/dashboard/my-questionnaires/dashboard-my-questionnaires.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    HomeScreenHomeComponent,
    HomeScreenLoginComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    DashboardComponent,
    DashboardMainScreenComponent,
    DashboardNewQuestionnaireComponent,
    DashboardMyQuestionnairesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
    }),
    MatDialogModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
  ],
  providers: [
    AsyncPipe,
    // { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
