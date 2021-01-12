import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Form, FormInput } from './core/signup';
import { fetch } from './core/fetch';
import { Alert } from '@material-ui/lab';
import { useStyles } from './styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as Yup from "yup";

export const Signin = () => {
  const [showAlert, setShowAlert] = useState(false);
  const classes = useStyles();
  const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
  });
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item sm={false} md={6} className={classes.signUpImage} />
      <Grid item sm={12} md={6} component={Paper} elevation={6} square>
        <div className={classes.loginPaperContainer}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Form
              validationSchema={SigninSchema}
            className={classes.form}
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (data) => {
              const res = await fetch({
                url: '/api/user/login',
                method: 'post',
                body: data,
              });
              console.log(res);
              if (res === 'success') {
                window.location.pathname = '/';
              } else if(res === 'error') {
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 3000);
              }
            }}

          >
            <FormInput name="email" label="Email" type="email" className={classes.formContent} />
            <FormInput
              type="password"
              label="Password"
              name="password"
              fullWidth
              className={classes.formContent}
            />
            {showAlert && <Alert severity="error">Invalid Password</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">

                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Form>
        </div>
      </Grid>
    </Grid>
  );
};
