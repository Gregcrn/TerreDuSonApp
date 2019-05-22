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
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} >
          Ajouter un produit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ajouter un nouveau produit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Remplissez tous les champs du produit que vous souhaitez ajouter
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="designation"
              label="Désignation"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="quantite"
              label="Quantité"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="unite"
              label="Unité (ex:Kg, litres)"
              type="text"
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="prix"
              label="Prix"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="fournisseur"
              label="Fournisseur"
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

