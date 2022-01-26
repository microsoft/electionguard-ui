import { Box, Container, IconButton, TextField, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';

import { useIntl } from 'react-intl';
import { SubmitElectionRequest } from '@electionguard/api-client';
import FormattedButton from '../../FormattedButton';
import IconHeader from '../../IconHeader';
import { Message, MessageId } from '../../../lang';

export interface SetupInstructionsStepProps {
    onNext?: (submitElectionRequest: SubmitElectionRequest) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: theme.spacing(2),
    },
    text: {
        width: 300,
        marginBottom: theme.spacing(4),
    },
}));

/**
 * Basic Information Retrieval for Election Setup
 */
const BasicInfoStep: React.FC<SetupInstructionsStepProps> = ({ onNext }) => {
    const [electionId, setElectionId] = useState('');
    const classes = useStyles();
    const intl = useIntl();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const submitElectionRequest = {
            election_id: electionId,
        } as SubmitElectionRequest;
        if (onNext) {
            onNext(submitElectionRequest);
        }
    };

    return (
        <Container maxWidth="md" className={classes.root}>
            <IconHeader title={new Message(MessageId.ElectionSetup_BasicInfo_Title)} />
            <form onSubmit={handleSubmit}>
                <TextField
                    id="election_id"
                    label="Election ID"
                    variant="standard"
                    className={classes.text}
                    onChange={(e) => setElectionId(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <Tooltip
                                title={intl.formatMessage({
                                    id: MessageId.ElectionSetup_BasicInfo_ElectionIdTooltip,
                                })}
                            >
                                <IconButton>
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                        ),
                    }}
                />
                <Box display="flex" justifyContent="center">
                    <FormattedButton
                        type="submit"
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        text={new Message(MessageId.ElectionSetup_BasicInfo_Next)}
                    />
                </Box>
            </form>
        </Container>
    );
};

export default BasicInfoStep;
