import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

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
    const { classes, className, subCategory } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img
            alt="SubCategory"
            className={classes.image}
            src={subCategory.imageUrl}
          />
        </div>
        <div className={classes.details}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            {subCategory.title}
          </Typography>
          <Typography
            className={classes.description}
            variant="body1"
          >
            {subCategory.description}
          </Typography>
        </div>
        <Divider />
        <div className={classes.stats}>
          <NavLink
            className={classes.navLink}
            to = {`/categories/${subCategory.categories_id}/${subCategory.id}`}
          >
            <Button
              className={classes.uploadButton}
              color="primary"
              variant="text"
            >
            Voir catégorie
            </Button>
          </NavLink>
        </div>
      </Paper>
    );
  }
}

ProductCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  subCategory: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductCard);
