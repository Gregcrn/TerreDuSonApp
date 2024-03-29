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

class ProductToolbar extends Component {
  render() {
    const { classes, className, selectedProducts } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          {selectedProducts.length > 0 && (
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

ProductToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedProducts: PropTypes.array
};

ProductToolbar.defaultProps = {
  selectedProducts: []
};

export default withStyles(styles)(ProductToolbar);
