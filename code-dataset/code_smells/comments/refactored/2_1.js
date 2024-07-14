class CreditScoreCalculator {
  static BASE_SCORE = 300;
  static MAX_SCORE = 850;
  static PAYMENT_HISTORY_WEIGHT = 0.35;
  static CREDIT_UTILIZATION_WEIGHT = 0.30;
  static CREDIT_HISTORY_WEIGHT = 0.15;
  static CREDIT_MIX_WEIGHT = 0.10;
  static NEW_INQUIRIES_WEIGHT = -0.10;

  static calculatePaymentHistoryScore(paymentHistory) {
    if (paymentHistory >= 95) {
      return this.PAYMENT_HISTORY_WEIGHT * this.MAX_SCORE;
    } else if (paymentHistory >= 90) {
      return 0.30 * this.MAX_SCORE;
    } else {
      return 0.20 * this.MAX_SCORE;
    }
  }

  static calculateCreditUtilizationScore(creditUtilization) {
    if (creditUtilization < 10) {
      return this.CREDIT_UTILIZATION_WEIGHT * this.MAX_SCORE;
    } else if (creditUtilization < 30) {
      return 0.20 * this.MAX_SCORE;
    } else {
      return 0.10 * this.MAX_SCORE;
    }
  }

  static calculateCreditHistoryScore(creditHistoryLength) {
    const historyScore = creditHistoryLength * this.CREDIT_HISTORY_WEIGHT * this.MAX_SCORE / 25;
    return historyScore > this.CREDIT_HISTORY_WEIGHT * this.MAX_SCORE ? this.CREDIT_HISTORY_WEIGHT * this.MAX_SCORE : historyScore;
  }

  static calculateCreditMixScore(creditMix) {
    const mixScore = creditMix * this.CREDIT_MIX_WEIGHT * this.MAX_SCORE / 5;
    return mixScore > this.CREDIT_MIX_WEIGHT * this.MAX_SCORE ? this.CREDIT_MIX_WEIGHT * this.MAX_SCORE : mixScore;
  }

  static calculateNewInquiriesPenalty(newInquiries) {
    const inquiryPenalty = newInquiries * Math.abs(this.NEW_INQUIRIES_WEIGHT) * this.MAX_SCORE / 10;
    return inquiryPenalty > Math.abs(this.NEW_INQUIRIES_WEIGHT) * this.MAX_SCORE ? Math.abs(this.NEW_INQUIRIES_WEIGHT) * this.MAX_SCORE : inquiryPenalty;
  }

  static calculateCreditScore(user) {
    let score = this.BASE_SCORE;

    score += this.calculatePaymentHistoryScore(user.paymentHistory);
    score += this.calculateCreditUtilizationScore(user.creditUtilization);
    score += this.calculateCreditHistoryScore(user.creditHistoryLength);
    score += this.calculateCreditMixScore(user.creditMix);
    score -= this.calculateNewInquiriesPenalty(user.newInquiries);

    return Math.min(Math.max(score, this.BASE_SCORE), this.MAX_SCORE);
  }
}

class API {
  calculateScore(user) {
    return CreditScoreCalculator.calculateCreditScore(user);
  }
}

module.exports = { API };