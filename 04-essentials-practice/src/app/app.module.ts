import { NgModule } from '@angular/core';
import { App } from './app';
import { Header } from './header/header';
import { InvestmentModule } from './investment/investment.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [App, Header],
  bootstrap: [App],
  imports: [BrowserModule, InvestmentModule],
})
export class AppModule {}
