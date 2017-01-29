import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AppComponent }   from './app.component';
import { HomePageComponent} from './homepage/component/homepage.component';
import { SearchTenantsComponent }      from './searchTenants/component/searchTenantsComponent';
import { TenantHomeComponent} from './tenantHome/component/tenantHome.component';
import { DeleteAccountComponent} from './tenantHome/component/deleteAccount.component';
import {AuthGuard} from './common/auth guard/authguard.services';
import {TestComponent} from './test/component/test.component'

//import { HeroDetailComponent }  from './hero-detail.component';
const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', component: HomePageComponent },
  { path: 'searchTenants',  component: SearchTenantsComponent },
  { path: 'home', component: TenantHomeComponent,
                  canActivate: [AuthGuard]},
  { path: 'deleteAccount',  component: DeleteAccountComponent },
  { path: '**', component: HomePageComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
