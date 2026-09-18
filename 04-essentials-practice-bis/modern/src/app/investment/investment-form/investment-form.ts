import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInputDto } from '../investment.model';

@Component({
  selector: 'app-investment-form',
  imports: [FormsModule],
  templateUrl: './investment-form.html',
  styleUrl: './investment-form.css',
})
export class InvestmentForm {
  investmentInput = output<InvestmentInputDto>();

  enteredInitialInvestment = signal(0);
  enteredAnnualInvestment = signal(0);
  enteredExpectedReturn = signal(0);
  enteredDuration = signal(0);

  onSubmit() {
    this.investmentInput.emit({
      initialInvestment: this.enteredInitialInvestment(),
      annualInvestment: this.enteredAnnualInvestment(),
      expectedReturn: this.enteredExpectedReturn(),
      duration: this.enteredDuration(),
    });
    this.enteredAnnualInvestment.set(0);
    this.enteredInitialInvestment.set(0);
    this.enteredExpectedReturn.set(0);
    this.enteredDuration.set(0);
  }
}
