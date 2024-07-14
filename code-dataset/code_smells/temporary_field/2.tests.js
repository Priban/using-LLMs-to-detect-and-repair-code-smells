const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add and process loan application with high credit score successfully', () => {
      const applicantDetails = { applicantName: 'John Doe', loanAmount: 10000, creditScore: 720 };
      api.submitLoanApplication(applicantDetails.applicantName, applicantDetails.loanAmount, applicantDetails.creditScore);

      const result = api.processLoanApplications();

      expect(result).toBe(true);
    });

    test('should add and process loan application with low credit score successfully', () => {
      const applicantDetails = { applicantName: 'Jane Smith', loanAmount: 15000, creditScore: 650 };
      api.submitLoanApplication(applicantDetails.applicantName, applicantDetails.loanAmount, applicantDetails.creditScore);

      const result = api.processLoanApplications();

      expect(result).toBe(true);
    });

    test('should process multiple loan applications', () => {
      const applicant1 = { applicantName: 'John Doe', loanAmount: 10000, creditScore: 720 };
      const applicant2 = { applicantName: 'Jane Smith', loanAmount: 15000, creditScore: 650 };

      api.submitLoanApplication(applicant1.applicantName, applicant1.loanAmount, applicant1.creditScore);
      api.submitLoanApplication(applicant2.applicantName, applicant2.loanAmount, applicant2.creditScore);

      const result = api.processLoanApplications();

      expect(result).toBe(true);
    });
  });
}

module.exports = runDescribe;