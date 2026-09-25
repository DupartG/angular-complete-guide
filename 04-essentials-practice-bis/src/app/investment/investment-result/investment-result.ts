import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InvestmentResultDto } from '../investment.model';

@Component({
  selector: 'app-investment-result',
  imports: [CurrencyPipe],
  templateUrl: './investment-result.html',
  styleUrl: './investment-result.css',
})
export class InvestmentResult {
  annualData = input.required<InvestmentResultDto[]>();
}
