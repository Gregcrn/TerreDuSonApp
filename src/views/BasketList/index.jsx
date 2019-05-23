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
import BasketTable from './components/BasketTable';
import BasketToolbar from './components/BasketToolbar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';


// Component styles
import styles from './styles';

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

    const subcatProd = products.filter((product) =>
      product.sous_categorie_id === lastSegment 
    )

    

    return (
      <BasketTable
        //
        onSelect={this.handleSelect}
        products={subcatProd}
      />
     
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedProducts } = this.state;

    return (
      <DashboardLayout title="Panier">
        <div className={classes.root}>
        
          <BasketToolbar selectedProducts={selectedProducts} />
          
          <Fab aria-label="Delete" size="small" className={classes.fab}>
            <DeleteIcon />
          </Fab>
          
          <Button variant="contained" color="primary" className={classes.button}>
            Valider
          </Button>
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
