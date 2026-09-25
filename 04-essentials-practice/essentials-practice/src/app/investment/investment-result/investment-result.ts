import { Component, Input } from '@angular/core';
import { InvestmentResultDto } from '../investment.model';

@Component({
  selector: 'app-investment-result',
  standalone: false,
  templateUrl: './investment-result.html',
  styleUrl: './investment-result.css',
})
export class InvestmentResult {
  @Input({ required: true }) annualData!: InvestmentResultDto[];
}
