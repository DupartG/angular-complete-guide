import { TestBed } from '@angular/core/testing';

import { InvestmentService } from './investment.service';

describe('InvestmentService', () => {
  let service: InvestmentService;

  beforeEach(() => {
    service = TestBed.inject(InvestmentService);
  });

  it('returns one entry per year', () => {
    expect(service.calculate(1000, 100, 5, 10)).toHaveLength(10);
  });

  it('returns an empty result for a duration of 0', () => {
    expect(service.calculate(1000, 100, 5, 0)).toEqual([]);
  });

  it('compounds interest and adds the annual investment each year', () => {
    const [year1, year2] = service.calculate(1000, 100, 10, 2);

    // Year 1: 1000 * 10% = 100 interest, then + 100 invested
    expect(year1.interest).toBeCloseTo(100);
    expect(year1.valueEndOfYear).toBeCloseTo(1200);
    expect(year1.totalAmountInvested).toBe(1100);
    expect(year1.totalInterest).toBeCloseTo(100);

    // Year 2: interest is computed on the new balance (1200)
    expect(year2.interest).toBeCloseTo(120);
    expect(year2.valueEndOfYear).toBeCloseTo(1420);
    expect(year2.totalAmountInvested).toBe(1200);
    expect(year2.totalInterest).toBeCloseTo(220);
  });

  it('keeps the invested amount unchanged with a 0% return', () => {
    const result = service.calculate(500, 50, 0, 3);

    expect(result.at(-1)?.valueEndOfYear).toBe(650);
    expect(result.every((year) => year.interest === 0)).toBe(true);
  });
});
