import { Component } from '@angular/core';
import { InvestmentInputDto, InvestmentResultDto } from './investment/investment.model';
import { InvestmentService } from './investment/investment.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private investmentService: InvestmentService) {}

  annualData: InvestmentResultDto[] = [];

  onInvestmentInput(input: InvestmentInputDto) {
    this.annualData = this.investmentService.calculate(
      input.initialInvestment,
      input.annualInvestment,
      input.expectedReturn,
      input.duration,
    );
  }
}
