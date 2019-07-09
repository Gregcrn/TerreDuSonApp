import React, { Component } from 'react';


// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Shared layouts
import DashboardLayout from 'layouts/Dashboard';

// Shared services
import { getProducts } from 'services/products';

// Custom components
import ProductTable from './components/ProductTable';
import ProductToolbar from './components/ProductToolbar';

// Component styles
import styles from './style';


class UserList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    products: [],
    selectedProducts: [],
    error: null
  };

  async getProducts() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state;

      const { products } = await getProducts(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          products
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

  componentDidMount() {
    this.signal = true;
    this.getProducts();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = selectedProducts => {
    this.setState({ selectedProducts });
  };

  renderProducts() {
    const { classes } = this.props;
    const { isLoading, products, error } = this.state;

    const path_slice = this.props.location.pathname.split('/');
    const lastSegment = path_slice.pop() || path_slice.pop();
    // console.log(this.props.match.params.id)

    const subcatProd = products.filter((product) =>
      product.sous_categorie_id === lastSegment 
    )

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (subcatProd.length === 0) {
      return <Typography variant="h6">Aucun produit disponible</Typography>;
    }

    return (
      <ProductTable
        //
        onSelect={this.handleSelect}
        products={subcatProd}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedProducts } = this.state;
    // console.log(selectedProducts)

    return (
      <DashboardLayout title="Produits">
        <div className={classes.root}>
          <ProductToolbar selectedProducts={selectedProducts} />
          <div className={classes.content}>{this.renderProducts()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
