import { Container } from '@material-ui/core';
import { LockOpen as DecryptIcon } from '@material-ui/icons';
import React from 'react';

import { Message, MessageId } from '../../../lang';
import StepHeader from '../../StepHeader';

export interface DecryptTallyShareStepProps {
    onNext?: () => void;
}

/**
 * Decrypt Tally Share Step for Tally Wizard
 */
const DecryptTallyShareStep: React.FC<DecryptTallyShareStepProps> = ({ onNext }) => (
    <Container maxWidth="md">
        <StepHeader
            title={new Message(MessageId.TallyCeremony_DecryptTallyShare_Title)}
            description={new Message(MessageId.TallyCeremony_DecryptTallyShare_Description)}
            buttonText={new Message(MessageId.TallyCeremony_DecryptTallyShare_Button)}
            onClick={onNext}
            Icon={DecryptIcon}
        />
    </Container>
);

export default DecryptTallyShareStep;
