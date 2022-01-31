import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Snackbar,
    SnackbarCloseReason,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { PublishOutlined } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ValidateManifestRequest } from '@electionguard/api-client';
import { Message, MessageId } from '../../../lang';
import IconHeader from '../../IconHeader';

export const alert = (props: AlertProps) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiAlert elevation={6} variant="filled" {...props} />
);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100%',
    },
    content: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export interface ManifestUploadStepProps {
    onNext: () => void;
    onUploadManifest: (manifestRequest: ValidateManifestRequest) => void;
}

const ManifestUploadStep: React.FC<ManifestUploadStepProps> = ({ onNext, onUploadManifest }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string>();

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(undefined);
    };

    const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files !== null) {
            const file = e.target.files[0];
            setUploading(true);
            try {
                const text = await file.text();
                const json = JSON.parse(text);
                const manifestRequest = {
                    manifest: json,
                } as ValidateManifestRequest;
                onUploadManifest(manifestRequest);
                setUploading(false);
                onNext();
            } catch (ex) {
                setError("That manifest file didn't look quite right, please try again.");
            } finally {
                setUploading(false);
            }
        } else {
            setError('No file found, please try again');
        }
    };

    const classes = useStyles();

    return (
        <Box
            flexDirection="column"
            alignContent="center"
            justifyContent="center"
            className={classes.root}
        >
            <Container maxWidth="md" className={classes.content}>
                <IconHeader
                    title={
                        new Message(
                            MessageId.ElectionSetupUploadManifestTitle,
                            'Upload Election Manifest'
                        )
                    }
                    Icon={PublishOutlined}
                />
                <div className={classes.wrapper}>
                    <Button
                        disabled={uploading}
                        color="secondary"
                        variant="contained"
                        component="label"
                    >
                        <FormattedMessage id={MessageId.ElectionSetupUploadManifestUpload} />
                        <input
                            id="manifest-upload"
                            accept="application/JSON"
                            type="file"
                            hidden
                            onChange={(e) => onFileUpload(e)}
                        />
                    </Button>
                    {uploading && (
                        <CircularProgress
                            size={24}
                            variant="indeterminate"
                            className={classes.buttonProgress}
                        />
                    )}
                </div>
            </Container>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>
                    <FormattedMessage id={MessageId.ElectionSetupUploadManifestError} />
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ManifestUploadStep;
