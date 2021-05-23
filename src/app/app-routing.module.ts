import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponent } from './components/tabla/tabla.component';
import { VideoComponent } from './components/video/video.component';
import { ApiComponent } from './components/api/api.component';

const routes: Routes = [
  { path:'tabla', component:TablaComponent },
  { path:'video', component:VideoComponent },
  { path:'api', component:ApiComponent },
  { path: '**',pathMatch:'full',redirectTo:'tabla'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
