import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
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
        <Button variant="contained" color="secondary" onClick={this.handleClickOpen} >
          Ajouter un utilisateur
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">AJOUTER UN UTILISATEUR</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Remplissez tous les champs ci-dessous
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              label="NOM"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="prenom"
              label="PRENOM"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Mot de passe"
              type="text"
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Em@il"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="role"
              label="Rôle (Rc,Ra,Gest)"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="budget"
              label="Budget €"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

