import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'App/core/auth.guard';
import { NotFountPageComponent } from 'App/core/not-fount-page/not-fount-page.component';


const routes: Routes = [
  {
    path: 'courses',
    data: { breadcrumb: 'courses' },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', component: NotFountPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
