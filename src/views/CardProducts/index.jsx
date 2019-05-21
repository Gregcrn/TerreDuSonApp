import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
// import { getProducts } from 'services/products';

// Custom components
import ProductTable from '../ProductsList/components/ProductTable';
import ProductToolbar from '../ProductsList/components/ProductToolbar';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';


// Component styles
import styles from './style';

class CardProduct extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    products: [],
    selectedProducts: [],
    error: null
  };
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
      return <Typography variant="h6">There are no users</Typography>;
    }

    return (
      <ProductTable
        //
        onSelect={this.handleSelect}
        products={this.state.selectedProducts}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedProducts } = this.state;
    console.log(selectedProducts)

    return (
      <DashboardLayout title="Produits">
        <div className={classes.root}>
          <ProductToolbar selectedProducts={selectedProducts} />
          <div className={classes.content}>{this.renderProducts()}</div>
          <div className={classes.content}>
          
            <TableBody>
              {selectedProducts
                .map(product => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={product.id}
                    selected={selectedProducts.indexOf(product.id) !== -1}
                  >
                    <TableCell className={classes.tableCell}>
                      <div className={classes.tableCellInner}>
                        <Checkbox
                          checked={selectedProducts.indexOf(product) !== -1}
                          color="primary"
                          onChange={event =>
                            this.handleSelectOne(event, product)
                          }
                          value="true"
                        />
                        <Link to="#">
                          <Typography
                            className={classes.nameText}
                            variant="body1"
                          >
                            {product.produit}
                          </Typography>
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {product.unit}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {product.prix}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {product.stock}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {product.fournisseur}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {product.adresse}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        id="standard-with-placeholder"
                        label="Séléctionner"
                        margin="normal"
                        placeholder={this.state.quantity}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

CardProduct.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardProduct);
