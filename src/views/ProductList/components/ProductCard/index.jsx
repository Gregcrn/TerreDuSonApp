import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// Shared components
import Paper from 'components/Paper';

// Component styles
import styles from './styles';

class ProductCard extends Component {
  render() {
    const { classes, className, product } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img
            alt="Product"
            className={classes.image}
            src={product.imageUrl}
          />
        </div>
        <div className={classes.details}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            {product.title}
          </Typography>
          <Typography
            className={classes.description}
            variant="body1"
          >
            {product.description}
          </Typography>
        </div>
        <Divider />
        <div className={classes.stats}>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            Voir catégorie
          </Button>
        </div>
      </Paper>
    );
  }
}

ProductCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductCard);
