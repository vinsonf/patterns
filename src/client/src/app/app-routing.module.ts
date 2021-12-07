import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCreateGameComponent } from './pages/page-create-game/page-create-game.component';
import { PageJoinGameComponent } from './pages/page-join-game/page-join-game.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';

const routes: Routes = [
  {path: 'register', component: PageRegisterComponent},
  {path: 'join-game', component: PageJoinGameComponent},
  {path: 'create-game', component: PageCreateGameComponent},
  {path: '**', redirectTo: '/register'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
