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
          variant="contained"
        >
          Sauvegarder
        </Button>
        <Dialog
          aria-describedby="alert-dialog-slide-description"
          aria-labelledby="alert-dialog-slide-title"
          keepMounted
          onClose={this.handleClose}
          open={this.state.open}
          // eslint-disable-next-line react/jsx-sort-props
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
    const { firstName, lastName, phone, email } = this.state;
    const rootClassName = classNames(classes.root, className);


    // Add Value property for Texfield later
    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Les informations peuvent être modifiées"
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
                placeholder={firstName}
                required
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Nom"
                margin="dense"
                placeholder={lastName}
                required
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Adresse mail"
                margin="dense"
                placeholdr={email}
                required
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Numéro de téléphone"
                margin="dense"
                placeholder={phone}
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
