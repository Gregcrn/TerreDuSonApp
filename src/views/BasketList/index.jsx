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
import SearchInput from '../../components/SearchInput/index.jsx';



// Component styles
import styles from './styles';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}
class UserList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    products: [],
    selectedProducts: [],
    error: null,
    data: [
      createData('HelloWorld', 305, 3.7, 67, 4.3),
      createData('Donut', 452, 25.0, 51, 4.9),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
      createData('Honeycomb', 408, 3.2, 87, 6.5),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Jelly Bean', 375, 0.0, 94, 0.0),
      createData('KitKat', 518, 26.0, 65, 7.0),
      createData('Lollipop', 392, 0.2, 98, 0.0),
      createData('Marshmallow', 318, 0, 81, 2.0),
      createData('Nougat', 360, 19.0, 9, 37.0),
      createData('Oreo', 437, 18.0, 63, 4.0),
    ],
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
  updateSearch(event) {
    this.setState({search : event.target.value.substr(0, 20)})
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

    //  const filteredPan = this.state.data.filter(
    //    (cat) => {
    //     return (cat.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
    //    }
    //  )

    

    return (
      <BasketTable
        onSelect={this.handleSelect}
        data={this.state.data}
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
          
          <div className={classes.containerBar}>
          <SearchInput
          className={classes.searchInput}
          onChange={this.updateSearch.bind(this)}
          placeholder="Rechercher un produit"
          value={this.state.search}
          />


          <Button variant="contained" color="primary" className={classes.button}>
            Valider
          </Button>
</div>

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
