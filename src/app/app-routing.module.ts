import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [
      {
        path: '',
        loadChildren: 'app/home/home.module#HomeModule'
      },
      {
        path: "",
        component: HeaderComponent,
        outlet: "header"
      },
      {
        path: "",
        component: FooterComponent,
        outlet: "footer"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
