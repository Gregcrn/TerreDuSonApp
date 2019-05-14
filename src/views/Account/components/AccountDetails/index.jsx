import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

// Shared components
import Portlet from 'components/Portlet';
import PortletHeader from 'components/PortletHeader';
import PortletLabel from 'components/PortletLabel';
import PortletContent from 'components/PortletContent';
import PortletFooter from 'components/PortletFooter';

// Component styles
import styles from './styles';

function Transition(props) {
  return <Slide 
    direction="up"
    {...props}
  />;
}

// eslint-disable-next-line react/no-multi-comp
class AlertDialogSlide extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          color="primary"
          onClick={this.handleClickOpen}
          variant="contained">
          Sauvegarder
        </Button>
        <Dialog
          aria-describedby="alert-dialog-slide-description"
          aria-labelledby="alert-dialog-slide-title"
          keepMounted
          onClose={this.handleClose}
          open={this.state.open}
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'Modification enregistré'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Votre demande de modifiction à bien été prise en compte.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

// eslint-disable-next-line react/no-multi-comp
class Account extends Component {
  state = {
    firstName: 'Theoma',
    lastName: 'Magreg',
    email: 'contact@dreamteam.com',
    phone: '0756742311',
    state: 'Alabama',
    country: 'USA',
  };
  render() {
    const { classes, className, ...rest } = this.props;
    const { firstName, lastName, phone, state, country, email } = this.state;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Les informations peuvent être modifiés"
            title="Profil"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form
            autoComplete="off"
            noValidate
          >
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Merci de préciser le prénom"
                label="Prénom"
                margin="dense"
                required
                value={firstName}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Nom"
                margin="dense"
                required
                value={lastName}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Adresse mail"
                margin="dense"
                required
                value={email}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Numéro de téléphone"
                margin="dense"
                type="number"
                value={phone}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Select State"
                margin="dense"
                onChange={this.handleChange}
                required
                select
                SelectProps={{native: true}}
                value={state}
                variant="outlined"
              >
                {states.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                className={classes.textField}
                label="Country"
                margin="dense"
                required
                value={country}
                variant="outlined"
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <AlertDialogSlide/>
        </PortletFooter>
      </Portlet>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
