import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HomeScreenHomeComponent } from './home-screen/home/home-screen-home.component';
import { HomeScreenLoginComponent } from './home-screen/login/home-screen-login.component';
import { DashboardComponent } from './home-screen/dashboard/dashboard.component';
import { DashboardMainScreenComponent } from './home-screen/dashboard/main-screen/dashboard-main-screen.component';
import { DashboardMyQuestionnairesComponent } from './home-screen/dashboard/my-questionnaires/dashboard-my-questionnaires.component';
import { DashboardNewQuestionnaireComponent } from './home-screen/dashboard/new-questionnaire/dashboard-new-questionnaire.component';
import { AuthGuard } from './shared/helpers/auth.guard';
import { QuestionnaireScreenComponent } from './public/questionnaire-screen/questionnaire-screen.component';
import { QuestionnaireStatsComponent } from './home-screen/dashboard/questionnaire-stats/questionnaire-stats.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: HomeScreenComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'questionnaire/:questionnaireID',
        component: QuestionnaireScreenComponent,
      },
      { path: 'home', component: HomeScreenHomeComponent },
      { path: 'login', component: HomeScreenLoginComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            canActivateChild: [AuthGuard],
            children: [
              {
                path: '',
                component: DashboardMainScreenComponent,
              },
              {
                path: 'questionnaire/:questionnaireID',
                component: QuestionnaireStatsComponent,
              },
              {
                path: 'dashboard-list',
                component: DashboardMyQuestionnairesComponent,
              },
              {
                path: 'dashboard-new',
                component: DashboardNewQuestionnaireComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
