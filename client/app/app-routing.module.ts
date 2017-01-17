import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }   from './app.component';
import { HomePageComponent} from './homepage/component/homepage.component';
import { SearchTenantsComponent }      from './searchTenants/component/searchTenantsComponent';
import { TenantHomeComponent} from './tenantHome/component/tenantHome.component';

//import { HeroDetailComponent }  from './hero-detail.component';
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'searchTenants',  component: SearchTenantsComponent },
  { path: '**', component: HomePageComponent },
  { path: 'home', component: TenantHomeComponent}
  //{ path: 'detail/:id', component: HeroDetailComponent },
  //{ path: 'heroes',     component: HeroesComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
