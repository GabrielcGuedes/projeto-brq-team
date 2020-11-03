import { AdmModule } from './adm/adm.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorsService } from './shared/interceptors/auth-interceptors.service';
import { HttpConfigInterceptorService } from './shared/interceptors/http-config-interceptor.service';
import { VendasModule } from './venda/vendas.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdmModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    VendasModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptorsService,
      multi : true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : HttpConfigInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
