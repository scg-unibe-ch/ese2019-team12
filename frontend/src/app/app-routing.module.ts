import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuPage} from './menu/menu.page';
import {MenuPageModule} from './menu/menu.module';
import {ExplorePageModule} from './explore/explore.module';
import {ExplorePage} from './explore/explore.page';

const routes: Routes = [
  { path: '', loadChildren: './menu/menu.module#MenuPageModule' },  { path: 'service', loadChildren: './service/service.module#ServicePageModule' }

];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
