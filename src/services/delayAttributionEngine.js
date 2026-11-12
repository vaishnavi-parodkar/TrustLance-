/**
 * TRUSTLANCE Deterministic Delay Attribution & Fair Payment Deduction Engine
 * Section 8 of TRUSTLANCE Specification
 *
 * Core Formula:
 * D = min(M * 0.01 * L, M * 0.10)
 * P = M - D
 *
 * Where:
 * M = affected milestone payment
 * L = freelancer-attributable late days
 * D = proposed deduction
 * P = net payable milestone amount
 */

export function calculateDelayDeduction({
  milestoneBudget,
  freelancerAttributableDays = 0,
  ratePerDayPct = 1.0,
  maxDeductionPct = 10.0,
}) {
  const M = Number(milestoneBudget);
  const L = Math.max(0, Number(freelancerAttributableDays));
  const rate = Number(ratePerDayPct) / 100;
  const maxCap = (M * Number(maxDeductionPct)) / 100;

  // Uncapped deduction
  const uncappedDeduction = M * rate * L;
  // Apply cap
  const D = Math.min(uncappedDeduction, maxCap);
  // Net payable amount
  const P = Math.max(0, M - D);

  const appliedDeductionPct = M > 0 ? (D / M) * 100 : 0;

  return {
    milestoneBudget: M,
    freelancerLateDays: L,
    deductionAmount: Number(D.toFixed(2)),
    deductionPct: Number(appliedDeductionPct.toFixed(2)),
    maxCapAmount: Number(maxCap.toFixed(2)),
    isCapped: uncappedDeduction > maxCap,
    netPayableAmount: Number(P.toFixed(2)),
  };
}

export function attributeDelayResponsibility({
  originalDeadlineDay,
  actualSubmissionDay,
  clientReviewDelayDays = 0,
  agreedExtensionDays = 0,
  externalDisruptionDays = 0,
}) {
  const totalDelayDays = Math.max(0, actualSubmissionDay - originalDeadlineDay);

  if (totalDelayDays === 0) {
    return {
      totalDelayDays: 0,
      freelancerDays: 0,
      clientDays: 0,
      excusedDays: 0,
      disputedDays: 0,
      classification: 'on_time',
      rationale: 'Deliverable submitted on or before the agreed milestone deadline.',
    };
  }

  // Calculate excused days (extensions + external factors)
  const excusedDays = Math.min(totalDelayDays, agreedExtensionDays + externalDisruptionDays);
  const unexcusedDays = totalDelayDays - excusedDays;

  // Calculate client-attributable days
  const clientDays = Math.min(unexcusedDays, clientReviewDelayDays);

  // Remaining days attributed to freelancer
  const freelancerDays = Math.max(0, unexcusedDays - clientDays);

  let classification = 'freelancer_caused';
  if (freelancerDays === 0 && clientDays > 0) {
    classification = 'client_caused';
  } else if (freelancerDays > 0 && clientDays > 0) {
    classification = 'shared';
  } else if (freelancerDays === 0 && excusedDays > 0) {
    classification = 'external';
  }

  let rationale = '';
  switch (classification) {
    case 'freelancer_caused':
      rationale = `Milestone submitted ${totalDelayDays} day(s) late with no documented client delays or approved extensions. Attributable entirely to the freelancer.`;
      break;
    case 'client_caused':
      rationale = `Milestone delayed by ${totalDelayDays} day(s) due to client review periods exceeding the agreed timeframe. No penalty applies to freelancer.`;
      break;
    case 'shared':
      rationale = `Total delay of ${totalDelayDays} day(s) consists of ${clientDays} day(s) client review hold and ${freelancerDays} day(s) freelancer delivery delay. Penalty applies only to the freelancer's ${freelancerDays} day(s).`;
      break;
    case 'external':
      rationale = `Delay was caused by qualifying documented external circumstances or approved contract extensions. Fully excused.`;
      break;
    default:
      rationale = 'Delay under review.';
  }

  return {
    totalDelayDays,
    freelancerDays,
    clientDays,
    excusedDays,
    disputedDays: 0,
    classification,
    rationale,
  };
}
