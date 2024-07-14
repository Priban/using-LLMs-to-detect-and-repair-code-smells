class LoanApplication {
  constructor(applicantName, loanAmount, creditScore) {
      this.applicantName = applicantName;
      this.loanAmount = loanAmount;
      this.creditScore = creditScore;
  }

  isCreditScoreSufficient() {
      return this.creditScore >= 700;
  }

  getApprovalStatus() {
      return this.isCreditScoreSufficient() ? 'Approved' : 'Pending Further Review';
  }

  finalizeApproval() {
      const approvalStatus = this.getApprovalStatus();
      if (approvalStatus === 'Approved') {
          console.log(`Loan for ${this.applicantName} has been approved for $${this.loanAmount}.`);
      } else {
          console.log(`Loan for ${this.applicantName} requires further review.`);
      }
  }

  processApplication() {
      this.finalizeApproval();
  }
}

class LoanService {
  constructor() {
      this.loanApplications = [];
  }

  addLoanApplication(applicantName, loanAmount, creditScore) {
      this.loanApplications.push(new LoanApplication(applicantName, loanAmount, creditScore));
  }

  processAllApplications() {
      for (const application of this.loanApplications) {
          application.processApplication();
      }
      return true;
  }
}

class API {
  constructor() {
      this.loanService = new LoanService();
  }

  submitLoanApplication(applicantName, loanAmount, creditScore) {
      this.loanService.addLoanApplication(applicantName, loanAmount, creditScore);
  }

  processLoanApplications() {
      return this.loanService.processAllApplications();
  }
}

module.exports = { API };