import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Checkbox,
  Accordion,
} from '@folio/stripes/components';

// eslint-disable-next-line
import {
  intervalIdsMap,
  intervalPeriods,
} from '@folio/circulation/constants';
// eslint-disable-next-line
import { Period } from '@folio/circulation/settings/components';
// eslint-disable-next-line
import { defaultLoanPolicy } from '@folio/circulation/settings/Models/LoanPolicy/utils'

import withSectionDefaults from '../withSectionDefaults';

class RequestManagementSection extends React.Component {
  static propTypes = {
    policy: PropTypes.object.isRequired,
    holdsSectionOpen: PropTypes.bool.isRequired,
    pagesSectionOpen: PropTypes.bool.isRequired,
    recallsSectionOpen: PropTypes.bool.isRequired,
    accordionOnToggle: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  };

  render() {
    const {
      policy,
      holdsSectionOpen,
      pagesSectionOpen,
      recallsSectionOpen,
      accordionOnToggle,
      change,
    } = this.props;

    if (!policy.loanable) {
      return null;
    }

    return (
      <React.Fragment>
        <h2>
          <FormattedMessage id="ui-circulation.settings.requestManagement.requestManagement" />
        </h2>
        <Accordion
          id="recallsSection"
          open={recallsSectionOpen}
          onToggle={accordionOnToggle}
          label={<FormattedMessage id="ui-circulation.settings.requestManagement.recalls" />}
        >
          <Period
            fieldLabel="ui-circulation.settings.requestManagement.recallReturnInterval"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.recalls.recallReturnInterval.duration"
            selectValuePath="requestManagement.recalls.recallReturnInterval.intervalId"
            intervalPeriods={intervalPeriods}
            changeFormValue={change}
          />
          <Period
            fieldLabel="ui-circulation.settings.requestManagement.minLoanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.recalls.minLoanPeriod.duration"
            selectValuePath="requestManagement.recalls.minLoanPeriod.intervalId"
            intervalPeriods={intervalPeriods}
            changeFormValue={change}
          />
        </Accordion>
        <Accordion
          id="holdsSection"
          open={holdsSectionOpen}
          onToggle={accordionOnToggle}
          label={<FormattedMessage id="ui-circulation.settings.requestManagement.holds" />}
        >
          <Period
            fieldLabel="ui-circulation.settings.requestManagement.alternateCheckoutLoanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.holds.alternateCheckoutLoanPeriod.duration"
            selectValuePath="requestManagement.holds.alternateCheckoutLoanPeriod.intervalId"
            intervalPeriods={intervalPeriods}
            changeFormValue={change}
          />
          <Field
            label={<FormattedMessage id="ui-circulation.settings.requestManagement.renewItemsWithRequest" />}
            name="requestManagement.holds.renewItemsWithRequest"
            id="requestManagement.holds.renewItemsWithRequest"
            component={Checkbox}
            type="checkbox"
            normalize={v => !!v}
          />
          <br />
          <Period
            fieldLabel="ui-circulation.settings.requestManagement.alternateRenewalLoanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.holds.alternateRenewalLoanPeriod.duration"
            selectValuePath="requestManagement.holds.alternateRenewalLoanPeriod.intervalId"
            intervalPeriods={intervalPeriods}
            changeFormValue={change}
          />
        </Accordion>
        <Accordion
          id="pagesSection"
          open={pagesSectionOpen}
          onToggle={accordionOnToggle}
          label={<FormattedMessage id="ui-circulation.settings.requestManagement.pages" />}
        >
          <Period
            fieldLabel="ui-circulation.settings.requestManagement.alternateCheckoutLoanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.pages.alternateCheckoutLoanPeriod.duration"
            selectValuePath="requestManagement.pages.alternateCheckoutLoanPeriod.intervalId"
            intervalPeriods={intervalPeriods}
            changeFormValue={change}
          />
          <Field
            label={<FormattedMessage id="ui-circulation.settings.requestManagement.renewItemsWithRequest" />}
            name="requestManagement.pages.renewItemsWithRequest"
            id="requestManagement.pages.renewItemsWithRequest"
            component={Checkbox}
            type="checkbox"
            normalize={v => !!v}
          />
          <br />
          <Period
            fieldLabel="ui-circulation.settings.requestManagement.alternateRenewalLoanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.pages.alternateRenewalLoanPeriod.duration"
            selectValuePath="requestManagement.pages.alternateRenewalLoanPeriod.intervalId"
            intervalPeriods={intervalPeriods}
            changeFormValue={change}
          />
        </Accordion>
      </React.Fragment>
    );
  }
}

export default withSectionDefaults({
  component: RequestManagementSection,
  checkMethodName: 'shouldInitRequestManagement',
  sectionsDefaults: { 'requestManagement': defaultLoanPolicy.requestManagement },
  dropdownDefaults: {
    'requestManagement.recalls.recallReturnInterval': { intervalId: intervalIdsMap.DAYS },
    'requestManagement.recalls.minLoanPeriod': { intervalId: intervalIdsMap.DAYS },
    'requestManagement.holds.alternateCheckoutLoanPeriod': { intervalId: intervalIdsMap.DAYS },
    'requestManagement.holds.alternateRenewalLoanPeriod': { intervalId: intervalIdsMap.DAYS },
    'requestManagement.pages.alternateCheckoutLoanPeriod': { intervalId: intervalIdsMap.DAYS },
    'requestManagement.pages.alternateRenewalLoanPeriod': { intervalId: intervalIdsMap.DAYS },
  },
});
