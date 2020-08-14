import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
    },
}));

const SignIn = ({error, signInHandler}) => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={classes.paper}>
            {error && error.errorMessage}
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
                <form>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email address"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        value={password}
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        required
                        autoComplete="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <Button
                        variant="contained"
                        disabled={email.length === 0 && password.length === 0}
                        color="primary"
                        onClick={() => {
                            signInHandler({email, password});
                        }}>
                        Sign in
                    </Button>
                </form>
            </Typography>
        </div>
    );
};

export default SignIn;
