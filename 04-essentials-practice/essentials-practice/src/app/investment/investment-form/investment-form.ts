import { Component, EventEmitter, Output } from '@angular/core';
import { InvestmentInputDto } from '../investment.model';

@Component({
  selector: 'app-investment-form',
  standalone: false,
  templateUrl: './investment-form.html',
  styleUrl: './investment-form.css',
})
export class InvestmentForm {
  @Output() investmentInput = new EventEmitter<InvestmentInputDto>();

  enteredInitialInvestment = 0;
  enteredAnnualInvestment = 0;
  enteredExpectedReturn = 0;
  enteredDuration = 0;

  onSubmit() {
    this.investmentInput.emit({
      initialInvestment: this.enteredInitialInvestment,
      annualInvestment: this.enteredAnnualInvestment,
      expectedReturn: this.enteredExpectedReturn,
      duration: this.enteredDuration,
    });
  }
}
