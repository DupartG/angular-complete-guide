export interface InvestmentResultDto{
    year: number,
    interest: number,
    valueEndOfYear: number,
    annualInvestment: number,
    totalInterest: number,
    totalAmountInvested: number
}

export interface InvestmentInputDto{
    initialInvestment: number,
    annualInvestment: number,
    expectedReturn: number,
    duration: number
}