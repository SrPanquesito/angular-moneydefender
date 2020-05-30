import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { CourseComponent } from './course/course.component';
import { LessonComponent } from './lesson/lesson.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'course', component: CourseComponent, canActivate: [AuthGuard] },
  {path: 'lesson', component: LessonComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
