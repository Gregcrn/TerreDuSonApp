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
import AddUser from '../../../../utils/AddUser'

// Component styles
import styles from './styles';

class FormDialog extends React.Component {
  state = {
    open: false,
    user: {
      nom: '',
      password: '',
      email: '',
      Role_utilisateur_id: {
        0:'Rôle',
        1: 1,
        2: 2,
        3: 3
      }
    }
  };
  AddUser = async () => {
    await AddUser(this.state.user);
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
    return (
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
              id="password"
              label="Mot de passe"
              margin="dense"
              onChange={(event) => this.userFieldChange('password', event.target.value)}
              type="text"
              value={this.state.user.password}
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
            <FormControl className={classes.formControl}>
              <InputLabel>Rôle</InputLabel>
              <NativeSelect
                input={
                  <Input
                    id="native-helper"
                    name="role"
                  />}
                onChange={(event) => this.userFieldChange('Role_utilisateur_id', event.target.value)}
              >
                <option value="" />
                <option value={this.state.user.Role_utilisateur_id[1]}>RC</option>
                <option value={this.state.user.Role_utilisateur_id[2]}>RA</option>
                <option value={this.state.user.Role_utilisateur_id[3]}>Gestionnaire</option>
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
              onClick={this.AddUser}
            >
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);