import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// Shared components
import Paper from 'components/Paper';

// Shared layouts
import DashboardLayout from 'layouts/Dashboard';

// Component styles
import styles from './styles';

class ProductList extends Component {
  signal = true;

  state = {
    isLoading: false,
  };

  componentWillMount() {
    this.signal = true;
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderCategories() {
    const { classes, className, } = this.props;
    const { isLoading } = this.state;
    const rootClassName = classNames(classes.root, className);

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <Grid
        container
        justify="space-evenly"
        spacing={24}
      >
        <Grid
          lg={3}
          md={6}
          xs={12}
        >
          <Link to="#">
            <Paper className={rootClassName}>
              <div className={classes.imageWrapper}>
                <img
                  alt="category"
                  className={classes.image}
                  src="/images/order.svg"
                />
              </div>
              <div className={classes.details}>
                <Typography
                  className={classes.title}
                  variant="h4"
                >
                  Nouvelle commande
                </Typography>
                <Typography
                  className={classes.description}
                  variant="body1"
                >
                  Débuter une commande de zéro.
                </Typography>
              </div>
              <Divider />
              <div className={classes.stats}>
                <NavLink 
                  className={classes.navLink}
                  to = "/categories"
                >
                  <Button
                    className={classes.uploadButton}
                    color="primary"
                    variant="text"
                  >
            Créer commande
                  </Button>
                </NavLink>
              </div>
            </Paper>
          </Link>
        </Grid>
        <Grid
          lg={3}
          md={6}
          xs={12}
        >
          <Link to="#">
            <Paper className={rootClassName}>
              <div className={classes.imageWrapper}>
                <img
                  alt="category"
                  className={classes.image}
                  src="/images/refresh.svg"
                />
              </div>
              <div className={classes.details}>
                <Typography
                  className={classes.title}
                  variant="h4"
                >
                  Reprendre une commande
                </Typography>
                <Typography
                  className={classes.description}
                  variant="body1"
                >
                  Continuer une commande en cours.
                </Typography>
              </div>
              <Divider />
              <div className={classes.stats}>
                <NavLink 
                  className={classes.navLink}
                  to = "/categories"
                >
                  <Button
                    className={classes.uploadButton}
                    color="primary"
                    variant="text"
                  >
            Reprendre
                  </Button>
                </NavLink>
              </div>
            </Paper>
          </Link>

        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Commander">
        <div className={classes.root}>
          <div className={classes.content}>{this.renderCategories()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

ProductList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductList);
