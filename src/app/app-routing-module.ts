import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { AboutComponent } from './components/shared/about/about.component';
import { ContactComponent } from './components/shared/contact/contact.component';

const routes: Routes = [
  {
    path: 'user',
    component: LayoutComponent,
    loadChildren: () => import('./components/user/user-module')
      .then(m => m.UserModule)
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '',
    redirectTo: '/user/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
