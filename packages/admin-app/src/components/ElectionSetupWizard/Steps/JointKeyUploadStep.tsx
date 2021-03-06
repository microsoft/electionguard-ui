import { Button, CircularProgress, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { VpnKey as KeyIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { CiphertextElectionContext, SubmitElectionRequest } from '@electionguard/api-client';
import IconHeader from '../../IconHeader';
import { Message, MessageId } from '../../../lang';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const useStyles = makeStyles((theme) => ({
    content: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        marginBottom: theme.spacing(2),
    },
    error: {
        marginBottom: theme.spacing(2),
    },
}));

export interface JointKeyUploadStepProps {
    onNext: () => void;
    onChanged: (newSubmitElectionRequest: SubmitElectionRequest) => void;
}

/**
 * Joint Key Select Step for Election Setup
 */
const JointKeyUploadStep: React.FC<JointKeyUploadStepProps> = ({ onNext, onChanged }) => {
    const [uploading, setUploading] = useState(false);
    const [errorMessageId, setErrorMessageId] = useState<string>();
    const classes = useStyles();

    const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files?.length) {
            setUploading(true);
            const file = e.target.files[0];
            const text = await file.text();
            try {
                const keys = JSON.parse(text);
                const context = {
                    commitment_hash: keys.commitment_hash,
                    crypto_base_hash: keys.crypto_base_hash,
                    crypto_extended_base_hash: keys.crypto_extended_base_hash,
                    elgamal_public_key: keys.elgamal_public_key,
                } as CiphertextElectionContext;
                const fileValid =
                    context.commitment_hash &&
                    context.crypto_base_hash &&
                    context.crypto_extended_base_hash &&
                    context.elgamal_public_key;
                if (!fileValid) {
                    throw new Error();
                }
                onChanged({ context } as SubmitElectionRequest);
                onNext();
            } catch (ex) {
                setErrorMessageId(MessageId.ElectionSetup_JointKeyUpload_InvalidFile);
            } finally {
                setUploading(false);
            }
        } else {
            setErrorMessageId(MessageId.ElectionSetup_JointKeyUpload_NoFile);
        }
    };

    return (
        <Container maxWidth="md" className={classes.content}>
            <IconHeader
                title={new Message(MessageId.ElectionSetup_JointKeyUpload_Title)}
                Icon={KeyIcon}
            />

            {errorMessageId && (
                <ErrorMessage className={classes.error} MessageId={errorMessageId} />
            )}

            <Button
                disabled={uploading}
                color="secondary"
                variant="contained"
                component="label"
                className={classes.button}
            >
                <FormattedMessage id={MessageId.ElectionSetup_JointKeyUpload_SelectFiles} />
                <input
                    id="manifest-upload"
                    accept="application/JSON"
                    type="file"
                    hidden
                    onChange={(e) => onFileUpload(e)}
                />
            </Button>
            {uploading && <CircularProgress size={24} variant="indeterminate" />}
        </Container>
    );
};

export default JointKeyUploadStep;
