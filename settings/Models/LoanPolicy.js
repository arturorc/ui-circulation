import {
  get,
  isNumber,
  isEmpty,
} from 'lodash';

import {
  intervalIdsMap,
  loanProfileMap,
  renewFromIds,
  BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
} from '../../constants';

class Period {
  constructor(period = {}) {
    this.duration = period.duration;
    this.intervalId = period.intervalId;
  }
}

class Metadata {
  constructor(metadata = {}) {
    this.createdByUserId = metadata.createdByUserId;
    this.createdDate = metadata.createdDate;
    this.updatedByUserId = metadata.updatedByUserId;
    this.updatedDate = metadata.updatedDate;
  }
}

class LoansPolicy {
  constructor(policy = {}) {
    this.profileId = policy.profileId;
    this.closedLibraryDueDateManagementId = policy.closedLibraryDueDateManagementId;
    this.fixedDueDateScheduleId = policy.fixedDueDateScheduleId;
    this.period = new Period(policy.period);
    this.existingRequestsPeriod = new Period(policy.existingRequestsPeriod);
    this.gracePeriod = new Period(policy.gracePeriod);
    this.openingTimeOffset = new Period(policy.openingTimeOffset);
  }
}

class RenewalsPolicy {
  constructor(policy = {}) {
    this.unlimited = policy.unlimited;
    this.numberAllowed = policy.numberAllowed;
    this.period = new Period(policy.period);
    this.reniewFromId = policy.reniewFromId;
    this.differentPeriod = policy.differentPeriod;
    this.alternateFixedDueDateScheduleId = policy.alternateFixedDueDateScheduleId;
  }
}

class Recalls {
  constructor({
    recallReturnInterval,
    minLoanPeriod,
    alternateGracePeriod,
  } = {}) {
    this.recallReturnInterval = new Period(recallReturnInterval);
    this.minLoanPeriod = new Period(minLoanPeriod);
    this.alternateGracePeriod = new Period(alternateGracePeriod);
  }
}

class Holds {
  constructor({
    alternateCheckoutLoanPeriod,
    renewItemsWithRequest,
    alternateRenewalLoanPeriod,
  } = {}) {
    this.alternateCheckoutLoanPeriod = new Period(alternateCheckoutLoanPeriod);
    this.renewItemsWithRequest = renewItemsWithRequest;
    this.alternateRenewalLoanPeriod = new Period(alternateRenewalLoanPeriod);
  }
}

class Pages {
  constructor({
    alternateCheckoutLoanPeriod,
    renewItemsWithRequest,
    alternateRenewalLoanPeriod,
  } = {}) {
    this.alternateCheckoutLoanPeriod = new Period(alternateCheckoutLoanPeriod);
    this.renewItemsWithRequest = renewItemsWithRequest;
    this.alternateRenewalLoanPeriod = new Period(alternateRenewalLoanPeriod);
  }
}

class RequestManagement {
  constructor({
    recalls,
    holds,
    pages,
  } = {}) {
    this.recalls = new Recalls(recalls);
    this.holds = new Holds(holds);
    this.pages = new Pages(pages);
  }
}

export default class LoanPolicy {
  static defaultLoanPolicy() {
    const defaultPolicy = {
      loanable: true,
      loansPolicy: {
        profileId: loanProfileMap.ROLLING,
      },
      renewable: true,
      renewalsPolicy: {
        unlimited: false,
        renewFromId: renewFromIds.SYSTEM_DATE,
        differentPeriod: false,
      },
    };

    return defaultPolicy;
  }

  constructor(policy = {}) {
    this.id = policy.id;
    this.name = policy.name;
    this.description = policy.description;
    this.loanable = policy.loanable || false;
    this.renewable = policy.renewable || false;
    this.loansPolicy = new LoansPolicy(policy.loansPolicy);
    this.renewalsPolicy = new RenewalsPolicy(policy.renewalsPolicy);
    this.metadata = new Metadata(policy.metadata);
    this.requestManagement = new RequestManagement(policy.requestManagement);
  }

  isShortTermLoan() {
    const profileId = get(this, 'loansPolicy.profileId');
    const intervalId = get(this, 'loansPolicy.period.intervalId');

    const isProfileRolling = profileId === loanProfileMap.ROLLING;
    const isShortTermPeriod = intervalId === intervalIdsMap.MINUTES || intervalId === intervalIdsMap.HOURS;

    return this.loanable && isProfileRolling && isShortTermPeriod;
  }

  isOpeningTimeOffsetActive() {
    const isShortTermMode = this.isShortTermLoan();
    const dueDateManagementId = get(this, 'loansPolicy.closedLibraryDueDateManagementId');
    return isShortTermMode && dueDateManagementId === BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS;
  }

  isProfileFixed() {
    return this.loanable && this.loansPolicy.profileId === loanProfileMap.FIXED;
  }

  isProfileRolling() {
    return this.loanable && this.loansPolicy.profileId === loanProfileMap.ROLLING;
  }

  isNumberOfRenewalsAllowedActive() {
    return this.renewable && !this.renewalsPolicy.unlimited;
  }

  isPeriodValid(period) {
    return isNumber(period.duration) && !isEmpty(period.intervalId);
  }
}