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
import { getSubCategory } from 'services/subcategory';

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
    subCategories: [],
    subCategoriesTotal: 0,
    error: null
  };

  async getSubCategory(limit) {
    try {
      this.setState({ isLoading: true });

      const { subCategories, subCategoriesTotal } = await getSubCategory(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          subCategories,
          subCategoriesTotal,
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

    this.getSubCategory(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderSubCategory() {
    const { classes } = this.props;
    const { isLoading, subCategories } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (subCategories.length === 0) {
      return (
        <Typography variant="h6">Aucune cétégorie disponible pour le moment</Typography>
      );
    }

    const path_slice = this.props.location.pathname.split('/');
    const lastSegment = path_slice.pop() || path_slice.pop();

    return (
      <Grid
        container
        spacing={24}
      >
        {subCategories.filter(subCat => subCat.categories_id === lastSegment ).map(subCategory => (
          <Grid
            item
            key={subCategory.id}
            lg={4}
            md={6}
            xs={12}
          >
            <Link to="#">
              <ProductCard subCategory={subCategory} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Sous Categories">
        <div className={classes.root}>
          <ProductsToolbar />
          <div className={classes.content}>{this.renderSubCategory()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductList);
