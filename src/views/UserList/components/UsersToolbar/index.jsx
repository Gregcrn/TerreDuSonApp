import React from 'react';

//External
import PropTypes from 'prop-types';

//Material helpers
import { withStyles } from '@material-ui/core/styles';

//Material components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
//Data
// import AddUser from '../../../../utils/AddUser'

// Component styles
import styles from './styles';
import { Slide } from '@material-ui/core';

//Firebase
import Config from '../../../../config/FirebaseConfig'

function Transition(props) {
  return <Slide 
    direction="up"
    {...props}
  />;
}

// eslint-disable-next-line react/no-multi-comp
class AlertValidate extends React.Component {
  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
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
            {'Ajout d\'utilisateur enregistré'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              L'ajout d'un nouvel utilisateur à bien été pris en compte.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class FormDialog extends React.Component {
  state = {
    open: false,
    validate: false,
    id:0,
    user: {
      "nom": '',
      "email": '',
      "role": ''
    }
  }


  writeUserData = (id) => {
    Config.database().ref('users').push({
      nom: this.state.user.nom,
      email: this.state.user.email,
      role: this.state.user.role,
      id: id
    });
    this.setState({
      validate: !this.state.validate,
      open: false
    })
  }
  
  handleClickOpen = () => {
    this.setState({ open: true }); 
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  userFieldChange = (prop, value) => {
    let {user} = this.state;
    user[prop] = value;
    this.setState({user: user});
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.user)
    return (
      <React.Fragment>
        <div>
          <Button
            color="secondary"
            onClick={this.handleClickOpen}
            variant="contained"
          >
          Ajouter un utilisateur
          </Button>
          <Dialog
            aria-labelledby="form-dialog-title"
            onClose={this.handleClose}
            open={this.state.open}
          >
            <DialogTitle id="form-dialog-title">AJOUTER UN UTILISATEUR</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Remplissez tous les champs ci-dessous
              </DialogContentText>
              <TextField
                autoFocus
                fullWidth
                id="nom"
                label="Nom et prenom"
                margin="dense"
                onChange={(event) => this.userFieldChange('nom', event.target.value)}
                type="text"
                value={this.state.user.nom}
              />
              <TextField
                autoFocus
                fullWidth
                id="email"
                label="Em@il"
                margin="dense"
                onChange={(event) => this.userFieldChange('email', event.target.value)}
                type="text"
                value={this.state.user.email}
              />
              {/* <TextField
                autoFocus
                fullWidth
                id="role"
                label="RA,RC,Gestionnaire"
                margin="dense"
                onChange={(event) => this.userFieldChange('role', event.target.value)}
                type="text"
                value={this.state.user.role}
              /> */}
              <FormControl className={classes.formControl}>
                <InputLabel>Rôle</InputLabel>
                <NativeSelect
                  input={
                    <Input
                      id="native-helper"
                      name="role"
                    />}
                  onChange={(event) => this.userFieldChange('role', event.target.value)}
                >
                  <option value="" />
                  <option value={'RC'}>RC</option>
                  <option value={'RA'}>RA</option>
                  <option value={'Gestionnaire'}>Gestionnaire</option>
                </NativeSelect>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.handleClose}
              >
              Annuler
              </Button>
              <Button
                color="primary"
                onClick={this.writeUserData}
              >
              Ajouter
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {this.state.validate ? <AlertValidate/> : null}
      </React.Fragment>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);