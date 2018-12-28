import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import {
  Checkbox,
  Accordion,
} from '@folio/stripes/components';

import { intervalPeriods } from '../../../../constants';
import PolicyPropertySetter from '../PolicyPropertySetter/PolicyPropertySetter';


class RenewalsSection extends React.Component {
  static propTypes = {
    policy: PropTypes.object.isRequired,
  };

  render() {
    const { policy } = this.props;

    if (!policy.loanable) {
      return null;
    }

    return (
      <React.Fragment>
        <h2>
          <FormattedMessage id="ui-circulation.settings.requestManagement.requestManagement" />
        </h2>
        <Accordion
          label={<FormattedMessage id="ui-circulation.settings.requestManagement.recalls" />}
        >
          <PolicyPropertySetter
            fieldLabel="ui-circulation.settings.requestManagement.recallReturnInterval"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.recalls.recallReturnInterval.duration"
            selectValuePath="requestManagement.recalls.recallReturnInterval.intervalId"
            entity={policy}
            intervalPeriods={intervalPeriods}
          />
          <PolicyPropertySetter
            fieldLabel="ui-circulation.settings.requestManagement.minLoanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.recalls.minLoanPeriod.duration"
            selectValuePath="requestManagement.recalls.minLoanPeriod.intervalId"
            entity={policy}
            intervalPeriods={intervalPeriods}
          />
          <PolicyPropertySetter
            fieldLabel="ui-circulation.settings.requestManagement.alternateGracePeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.recalls.alternateGracePeriod.duration"
            selectValuePath="requestManagement.recalls.alternateGracePeriod.intervalId"
            entity={policy}
            intervalPeriods={intervalPeriods}
          />
        </Accordion>
        <Accordion
          label={<FormattedMessage id="ui-circulation.settings.requestManagement.holds" />}
        >
          <PolicyPropertySetter
            fieldLabel="ui-circulation.settings.requestManagement.alternateCheckoutLoanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.holds.alternateCheckoutLoanPeriod.duration"
            selectValuePath="requestManagement.holds.alternateCheckoutLoanPeriod.intervalId"
            entity={policy}
            intervalPeriods={intervalPeriods}
          />
          <hr />
          <br />
          <Field
            label={<FormattedMessage id="ui-circulation.settings.requestManagement.renewItemsWithRequest" />}
            name="requestManagement.holds.renewItemsWithRequest"
            id="requestManagement.holds.renewItemsWithRequest"
            component={Checkbox}
            type="checkbox"
            normalize={v => !!v}
          />
          <br />
          <PolicyPropertySetter
            fieldLabel="ui-circulation.settings.requestManagement.alternateRenewalLoanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.holds.alternateRenewalLoanPeriod.duration"
            selectValuePath="requestManagement.holds.alternateRenewalLoanPeriod.intervalId"
            entity={policy}
            intervalPeriods={intervalPeriods}
          />
        </Accordion>
        <Accordion
          label={<FormattedMessage id="ui-circulation.settings.requestManagement.pages" />}
        >
          <PolicyPropertySetter
            fieldLabel="ui-circulation.settings.requestManagement.alternateCheckoutLoanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.pages.alternateCheckoutLoanPeriod.duration"
            selectValuePath="requestManagement.pages.alternateCheckoutLoanPeriod.intervalId"
            entity={policy}
            intervalPeriods={intervalPeriods}
          />
          <Field
            label={<FormattedMessage id="ui-circulation.settings.requestManagement.renewItemsWithRequest" />}
            name="requestManagement.renewItemsWithRequest"
            id="requestManagement.pages.renewItemsWithRequest"
            component={Checkbox}
            type="checkbox"
            normalize={v => !!v}
          />
          <br />
          <PolicyPropertySetter
            fieldLabel="ui-circulation.settings.requestManagement.alternateRenewalLoanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="requestManagement.pages.alternateRenewalLoanPeriod.duration"
            selectValuePath="requestManagement.pages.alternateRenewalLoanPeriod.intervalId"
            entity={policy}
            intervalPeriods={intervalPeriods}
          />
        </Accordion>
      </React.Fragment>
    );
  }
}

export default RenewalsSection;