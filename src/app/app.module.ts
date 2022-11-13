import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeClienteComponent } from './pages/cliente/home-cliente/home-cliente.component';
import { CreateClienteComponent } from './pages/cliente/create-cliente/create-cliente.component';
import { UpdateClienteComponent } from './pages/cliente/update-cliente/update-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from './services/cliente.service';
import { NgxMaskModule } from 'ngx-mask';
import { ViewImovelComponent } from './pages/imovel/view-imovel/view-imovel.component';
import { CreateImovelComponent } from './pages/imovel/create-imovel/create-imovel.component';
import { UpdateImovelComponent } from './pages/imovel/update-imovel/update-imovel.component';
import { ImoveisClienteComponent } from './pages/cliente/imoveis-cliente/imoveis-cliente.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CreateImovelClienteComponent } from './pages/cliente/create-imovel-cliente/create-imovel-cliente.component';
import { UpdateImovelClienteComponent } from './pages/cliente/update-imovel-cliente/update-imovel-cliente.component';
import { DetailsImovelComponent } from './pages/imovel/details-imovel/details-imovel.component';
import { DetailsImovelClienteComponent } from './pages/cliente/details-imovel-cliente/details-imovel-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeClienteComponent,
    CreateClienteComponent,
    UpdateClienteComponent,
    ViewImovelComponent,
    CreateImovelComponent,
    UpdateImovelComponent,
    ImoveisClienteComponent,
    CreateImovelClienteComponent,
    UpdateImovelClienteComponent,
    DetailsImovelComponent,
    DetailsImovelClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    CurrencyPipe
  ],
  providers: [
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
