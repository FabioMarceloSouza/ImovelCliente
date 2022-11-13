import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClienteComponent } from './pages/cliente/create-cliente/create-cliente.component';
import { CreateImovelClienteComponent } from './pages/cliente/create-imovel-cliente/create-imovel-cliente.component';
import { DetailsImovelClienteComponent } from './pages/cliente/details-imovel-cliente/details-imovel-cliente.component';
import { HomeClienteComponent } from './pages/cliente/home-cliente/home-cliente.component';
import { ImoveisClienteComponent } from './pages/cliente/imoveis-cliente/imoveis-cliente.component';
import { UpdateClienteComponent } from './pages/cliente/update-cliente/update-cliente.component';
import { UpdateImovelClienteComponent } from './pages/cliente/update-imovel-cliente/update-imovel-cliente.component';
import { CreateImovelComponent } from './pages/imovel/create-imovel/create-imovel.component';
import { DetailsImovelComponent } from './pages/imovel/details-imovel/details-imovel.component';
import { UpdateImovelComponent } from './pages/imovel/update-imovel/update-imovel.component';
import { ViewImovelComponent } from './pages/imovel/view-imovel/view-imovel.component';

const routes: Routes = [
  { path: "", component: HomeClienteComponent },
  { path: "create-cliente", component: CreateClienteComponent },
  { path: "update-cliente/:id", component: UpdateClienteComponent },
  { path: "imovies-cliente/:id", component: ImoveisClienteComponent },
  { path: "create-imovel-cliente/:id", component: CreateImovelClienteComponent },
  { path: "update-imovel-cliente/:id", component: UpdateImovelClienteComponent },
  { path: "details-imovel-cliente/:id", component: DetailsImovelClienteComponent },
  { path: "view-imovel", component: ViewImovelComponent },
  { path: "create-imovel", component: CreateImovelComponent },
  { path: "update-imovel/:id", component: UpdateImovelComponent },
  { path: "details-imovel/:id", component: DetailsImovelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
