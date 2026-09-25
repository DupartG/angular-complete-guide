import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentForm } from './investment-form/investment-form';
import { InvestmentResult } from './investment-result/investment-result';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InvestmentForm, InvestmentResult],
  imports: [CommonModule, FormsModule],
  exports: [InvestmentForm, InvestmentResult],
})
export class InvestmentModule {}
