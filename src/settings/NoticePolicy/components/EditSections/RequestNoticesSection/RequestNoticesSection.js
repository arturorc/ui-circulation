import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form';
import { values } from 'lodash';
import { Accordion } from '@folio/stripes/components';

import NoticesList from '../components';
import {
  requestNoticesTriggeringEvents,
  requestTimeBasedEventsIds,
} from '../../../../../constants';

class RequestNoticesSection extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    policy: PropTypes.object.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  render() {
    const {
      isOpen,
      policy,
      templates,
      onToggle,
    } = this.props;

    const props = {
      sectionKey: 'requestNotices',
      policy,
      templates,
      triggeringEvents: requestNoticesTriggeringEvents,
      timeBasedEventsIds: values(requestTimeBasedEventsIds),
    };

    return (
      <Accordion
        id="requestNotices"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.requestNotices" />}
        onToggle={onToggle}
      >
        <FieldArray
          name={props.sectionKey}
          component={NoticesList}
          props={props}
        />
      </Accordion>
    );
  }
}

export default RequestNoticesSection;
