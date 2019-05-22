import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Shared layouts
import DashboardLayout from 'layouts/Dashboard';

// Shared services
import { getCategory } from 'services/category';

// Custom components
import ProductsToolbar from './components/ProductsToolbar';
import ProductCard from './components/ProductCard';

// Component styles
import styles from './styles';

class ProductList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 100,
    categories: [],
    categoriesTotal: 0,
    error: null
  };

  async getCategory(limit) {
    try {
      this.setState({ isLoading: true });

      const { categories, categoriesTotal } = await getCategory(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          categories,
          categoriesTotal,
          limit
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentWillMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getCategory(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderCategories() {
    const { classes } = this.props;
    const { isLoading, categories } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (categories.length === 0) {
      return (
        <Typography variant="h6">Aucune cétégorie disponible pour le moment</Typography>
      );
    }
    return (
      <Grid
        container
        spacing={24}
      >
        {categories.map(category => (
          <Grid
            item
            key={category.id}
            lg={4}
            md={6}
            xs={12}
          >
            <Link to="#">
              <ProductCard category={category} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Categories">
        <div className={classes.root}>
          <ProductsToolbar />
          <div className={classes.content}>{this.renderCategories()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductList);
