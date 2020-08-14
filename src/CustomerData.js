import React from 'react';
import {
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import {useQuery} from '@apollo/client';
import {getCustomerState} from './queries/localState';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
    },
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: '1.5rem',
    },
}));

const CustomerData = () => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(getCustomerState);

    let content;

    if (loading) {
        console.log(`Loading`);
        content = <CircularProgress />;
    }

    if (error) {
        content = <p>Error!</p>;
    }

    if (data && data.customerState) {
        console.log(data);
        content = (
            <Typography
                className={
                    classes.title
                }>{`Hello, ${data.customerState.firstname}`}</Typography>
        );
    }

    return (
        <div className={classes.paper}>
            <Card className={classes.root}>
                <CardContent>{content}</CardContent>
            </Card>
        </div>
    );
};

export default CustomerData;
