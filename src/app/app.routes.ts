import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ComplaintComponent} from "./components/complaint/complaint.component";
import {CommonModule} from "@angular/common";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";
import {CreateComplaintComponent} from "./components/create-complaint/create-complaint.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'complaints', component: ComplaintComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'complaints/create', component: CreateComplaintComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
  ],
})
export class AppModule {}
