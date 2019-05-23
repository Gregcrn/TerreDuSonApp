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
import ProductCard from './components/ProductCard';
import SearchInput from 'components/SearchInput'

// Component styles
import styles from './styles';

class ProductList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 100,
    subCategories: [],
    subCategoriesTotal: 0,
    error: null,
    search:''
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

  updateSearch(event){
    this.setState({search: event.target.value.substr(0,20)})
  }

  renderSubCategory() {
    const { classes } = this.props;
    const { isLoading, subCategories } = this.state;

    const filteredSubCat = this.state.subCategories.filter(
      (subcat) => {
        return (subcat.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
      }
    )

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
      <div>
        <SearchInput
          className={classes.searchInput}
          onChange={this.updateSearch.bind(this)}
          placeholder="Rechercher une sous catégorie"
          value={this.state.search}
        />
        <Grid
          container
          spacing={24}
        >
          {filteredSubCat.filter(subCat => subCat.categories_id === lastSegment ).map(subCategory => (
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
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Sous Categories">
        <div className={classes.root}>
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
