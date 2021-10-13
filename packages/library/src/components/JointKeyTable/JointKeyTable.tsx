import { JointKey } from '@electionguard-ui/api-client';
import { Box, Button, makeStyles } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import * as React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AsyncResult } from '../../data/AsyncResult';
import AsyncContent from '../AsyncContent';
import { FormattedDateCell } from '../Cells';
import FilterToolbar from '../FilterToolbar';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .bold-style--header': {
            marginLeft: -theme.spacing(0.25),
            fontSize: theme.typography.h6.fontSize,
            fontWeight: theme.typography.h6.fontWeight,
            '& .MuiDataGrid-columnSeparator': {
                opacity: `0 !important`,
            },
        },
    },
}));

export interface JointKeyTableProps {
    data: () => AsyncResult<JointKey[]>;
}

const LinkCell = (): React.ReactElement => <Button color="primary">Open</Button>;

const columns = (intl: IntlShape): GridColDef[] => [
    { field: 'name', headerName: 'Name', width: 400, headerClassName: 'bold-style--header' },
    {
        field: 'numberOfGuardians',
        headerName: '# of Guardians',
        align: 'center',
        headerAlign: 'center',
        width: 250,
        headerClassName: 'bold-style--header',
    },
    {
        field: 'quorum',
        headerName: 'Quorum',
        align: 'center',
        headerAlign: 'center',
        width: 150,
        headerClassName: 'bold-style--header',
    },
    {
        field: 'dateCreated',
        headerName: 'Date Created',
        width: 250,
        renderCell: (params) => FormattedDateCell(params, intl),
        headerClassName: 'bold-style--header',
    },
    {
        field: 'id',
        headerName: ' ',
        align: 'right',
        width: 100,
        renderCell: LinkCell,
        headerClassName: 'bold-style--header',
    },
];

const JointKeyTable: React.FC<JointKeyTableProps> = ({ data }) => {
    const intl = useIntl();
    const classes = useStyles();
    const jointKeyQuery = data();
    const queryClient = new QueryClient();

    // data().then((keys) => {
    //     keyData = keys;
    // });
    return (
        <QueryClientProvider client={queryClient}>
            <Box display="flex" minHeight="500px" height="100%" width="100%">
                <AsyncContent query={jointKeyQuery} errorMessage="there was an error">
                    {(keyData) => (
                        <>
                            <DataGrid
                                className={classes.root}
                                autoHeight
                                rows={keyData}
                                columns={columns(intl)}
                                components={{
                                    Toolbar: FilterToolbar,
                                }}
                                hideFooterPagination
                            />
                        </>
                    )}
                </AsyncContent>
            </Box>
        </QueryClientProvider>
    );
};

export default JointKeyTable;
