import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// Shared components



// Component styles
import styles from './styles';

class BasketToolbar extends Component {
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
        </div>
      </div>
    );
  }
}

BasketToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array
};

BasketToolbar.defaultProps = {
  selectedUsers: []
};

export default withStyles(styles)(BasketToolbar);
