/* eslint-disable no-console */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles/index';

// Material components
import Grid from '@material-ui/core/Grid/index';
import Button from '@material-ui/core/Button/index';
import IconButton from '@material-ui/core/IconButton/index';
import TextField from '@material-ui/core/TextField/index';
import Typography from '@material-ui/core/Typography/index';

// Icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Component styles
import styles from './styles';

//Firebase
import firebase from '../../config/FirebaseConfig';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // eslint-disable-next-line no-unused-vars
      .then((user) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;
    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteWrapper}
            item
            lg={5}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner} />
            </div>
          </Grid>
          <Grid
            className={classes.content}
            item
            lg={7}
            xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form
                  className={classes.form}
                  onSubmit={this.handleSubmit}
                >
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Se connecter
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  />
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="votre email"
                      name="email"
                      onChange={this.handleInputChange}
                      type="text"
                      value={email}
                      variant="outlined"
                    />{error && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        Un email valide est requis
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="votre mot de passe"
                      name="password"
                      onChange={this.handleInputChange}
                      type="password"
                      value={password}
                      variant="outlined"
                    />
                    {error && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        Le mot de passe est requis
                      </Typography>
                    )}
                  </div>
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    onClick={this.handleSubmit}
                    size="large"
                    variant="contained"
                  >
                      Se connecter
                  </Button>

                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default(
  withRouter,
  withStyles(styles)
)(SignIn);
