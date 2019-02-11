import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { map } from 'lodash';

import { Accordion } from '@folio/stripes/components';

import NoticeCard from '../components';
import { requestNoticesSendWhen } from '../../../../../constants';

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

    return (
      <Accordion
        id="requestNotices"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.requestNotices" />}
        onToggle={onToggle}
      >
        {map(policy.requestNotices, (notice, index) => (
          <NoticeCard
            key={index}
            index={index}
            sectionKey="requestNotices"
            policy={policy}
            templates={templates}
            sendWhenOptions={requestNoticesSendWhen}
          />
        ))}
      </Accordion>
    );
  }
}

export default RequestNoticesSection;
