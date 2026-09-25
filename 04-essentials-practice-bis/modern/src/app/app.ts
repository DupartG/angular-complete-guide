import { Component, inject, signal } from '@angular/core';
import { Header } from './header/header';
import { InvestmentForm } from './investment/investment-form/investment-form';
import { InvestmentResult } from './investment/investment-result/investment-result';
import { InvestmentService } from './investment/investment.service';
import { InvestmentInputDto, InvestmentResultDto } from './investment/investment.model';

@Component({
  selector: 'app-root',
  imports: [Header, InvestmentForm, InvestmentResult],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private investmentService = inject(InvestmentService);

  annualData = signal<InvestmentResultDto[]>([]);

  onInvestmentInput(input: InvestmentInputDto) {
    this.annualData.set(
      this.investmentService.calculate(
        input.initialInvestment,
        input.annualInvestment,
        input.expectedReturn,
        input.duration,
      ),
    );
  }
}
