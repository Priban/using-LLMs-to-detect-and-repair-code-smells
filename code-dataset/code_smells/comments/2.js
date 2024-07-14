function calculateCreditScore(user) {
  var score = 300;

  // Factor 1: Payment history
  // Add 35% of the score based on payment history
  // Assume user.paymentHistory is a percentage of on-time payments
  if (user.paymentHistory >= 95) {
      score += 0.35 * 850; // 35% of the score if 95% or more on-time
  } else if (user.paymentHistory >= 90) {
      score += 0.30 * 850; // 30% of the score if 90-94% on-time
  } else {
      score += 0.20 * 850; // 20% of the score if below 90% on-time
  }

  // Factor 2: Credit utilization
  // Add 30% of the score based on credit utilization ratio
  // Assume user.creditUtilization is a percentage of credit used
  var utilizationScore;
  if (user.creditUtilization < 10) {
      utilizationScore = 0.30 * 850; // Best score if utilization is below 10%
  } else if (user.creditUtilization < 30) {
      utilizationScore = 0.20 * 850; // Good score if utilization is 10-30%
  } else {
      utilizationScore = 0.10 * 850; // Low score if utilization is above 30%
  }
  score += utilizationScore;

  // Factor 3: Length of credit history
  // Add 15% of the score based on the length of credit history
  // Assume user.creditHistoryLength is the number of years
  var historyScore = user.creditHistoryLength * 0.15 * 850 / 25;
  // Max score if history is 25 years or more
  score += historyScore > 0.15 * 850 ? 0.15 * 850 : historyScore;

  // Factor 4: Credit mix
  // Add 10% of the score based on the diversity of credit types
  // Assume user.creditMix is the number of different credit types
  var mixScore = user.creditMix * 0.10 * 850 / 5;
  // Max score if 5 or more different credit types
  score += mixScore > 0.10 * 850 ? 0.10 * 850 : mixScore;

  // Factor 5: New credit inquiries
  // Subtract 10% of the score for recent credit inquiries
  // Assume user.newInquiries is the number of recent inquiries
  var inquiryPenalty = user.newInquiries * 0.10 * 850 / 10;
  // Max penalty if 10 or more inquiries
  score -= inquiryPenalty > 0.10 * 850 ? 0.10 * 850 : inquiryPenalty;

  // Ensure the score is capped between 300 and 850
  if (score > 850) {
      score = 850;
  } else if (score < 300) {
      score = 300;
  }

  return score;
}

class API {
  calculateScore(user) {
      return calculateCreditScore(user);
  }
}

module.exports = { API };