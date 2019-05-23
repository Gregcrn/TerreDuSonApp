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
import ProductCard from './components/ProductCard';
import SearchInput from 'components/SearchInput';

// Component styles
import styles from './styles';

class ProductList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 100,
    categories: [],
    categoriesTotal: 0,
    error: null, 
    search:''
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
  updateSearch(event) {
    this.setState({search : event.target.value.substr(0, 20)})
  }
  renderCategories() {
    const { classes } = this.props;
    const { isLoading, categories } = this.state;

    const filteredCat = this.state.categories.filter(
      (cat) => {
        return (cat.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
      }
    )
    

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
      <div>
        <SearchInput
          className={classes.searchInput}
          onChange={this.updateSearch.bind(this)}
          placeholder="Rechercher un produit"
          value={this.state.search}
        />
        <Grid
          container
          spacing={24}
        >
          {filteredCat.map(category => (
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
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Categories">
        <div className={classes.root}>
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
