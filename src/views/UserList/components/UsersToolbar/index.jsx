import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

// Shared components
import SearchInput from 'components/SearchInput';
import DisplayMode from 'components/DisplayMode';

// Component styles
import styles from './styles';

import AddUser from '../../../../utils/AddUser'

class UsersToolbar extends Component {

  async AddUser(){
    let user = {
      nom: "New2",
      password: "123456",
      email: "New2@test.com",
      Role_utilisateur_id: 3
    };
    await AddUser(user); 
  }

  render() {
    const { classes, className, selectedUsers } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          {selectedUsers.length > 0 && (
            <IconButton
              className={classes.deleteButton}
              onClick={this.handleDeleteUsers}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <Button
            className={classes.importButton}
            size="small"
            variant="outlined"
          >
            <ArrowDownwardOutlinedIcon className={classes.importIcon} /> Importer
          </Button>
          <Button
            className={classes.exportButton}
            size="small"
            variant="outlined"
          >
            <ArrowUpwardOutlinedIcon className={classes.exportIcon} />
            Exporter
          </Button>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick = { this.AddUser }
          >
            Ajouter un utilisateur
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Rechercher utlisateur"
          />
          <span className={classes.spacer} />
          <DisplayMode mode="list" />
        </div>
      </div>
    );
  }
}

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array
};

UsersToolbar.defaultProps = {
  selectedUsers: []
};

export default withStyles(styles)(UsersToolbar);
