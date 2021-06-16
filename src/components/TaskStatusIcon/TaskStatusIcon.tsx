import { makeStyles } from '@material-ui/core';
import {
    CheckCircleOutlined as CompleteIcon,
    CancelOutlined as ErrorIcon,
} from '@material-ui/icons';
import React from 'react';

import { MessageId } from '../../lang';
import TaskStatus from '../../models/taskStatus';
import InternationalText from '../InternationalText';

const iconSize = 36;

const useStyles = makeStyles(() => ({
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: iconSize,
    },
}));

export interface TaskStatusIconProps {
    status: TaskStatus;
}

/**
 * A menu option card for the menu screens
 */
const TaskStatusIcon: React.FC<TaskStatusIconProps> = ({ status }) => {
    const classes = useStyles();
    switch (status) {
        case TaskStatus.Complete:
            return (
                <InternationalText
                    className={classes.icon}
                    id={MessageId.TaskStatus_Error}
                    screenReaderOnly
                >
                    <CompleteIcon fontSize="inherit" color="primary" />
                </InternationalText>
            );
        case TaskStatus.Error:
            return (
                <InternationalText
                    className={classes.icon}
                    id={MessageId.TaskStatus_Error}
                    screenReaderOnly
                >
                    <ErrorIcon fontSize="inherit" color="error" />
                </InternationalText>
            );
        case TaskStatus.Incomplete:
            return (
                <InternationalText
                    className={classes.icon}
                    id={MessageId.TaskStatus_Incomplete}
                    screenReaderOnly
                />
            );
        default:
            return (
                <InternationalText
                    className={classes.icon}
                    id={MessageId.TaskStatus_Incomplete}
                    screenReaderOnly
                />
            );
    }
};

export default TaskStatusIcon;