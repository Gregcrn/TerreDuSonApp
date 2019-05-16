import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components

import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';

// Shared helpers


// Shared components
import Portlet from 'components/Portlet';
import PortletContent from 'components/PortletContent';

// Component styles
import styles from './styles';

class ProductTable extends Component {
  state = {
    selectedProducts: [],
    rowsPerPage: 10,
    page: 0
  };

  handleSelectAll = event => {
    const { products, onSelect } = this.props;

    let selectedProducts;

    if (event.target.checked) {
      selectedProducts = products.map(product => product.id);
    } else {
      selectedProducts = [];
    }

    this.setState({ selectedProducts });

    onSelect(selectedProducts);
  };

  handleSelectOne = (event, id) => {
    const { onSelect } = this.props;
    const { selectedProducts } = this.state;

    const selectedIndex = selectedProducts.indexOf(id);
    let newSelectedProduct = [];

    if (selectedIndex === -1) {
      newSelectedProduct = newSelectedProduct.concat(selectedProducts, id);
    } else if (selectedIndex === 0) {
      newSelectedProduct = newSelectedProduct.concat(selectedProducts.slice(1));
    } else if (selectedIndex === selectedProducts.length - 1) {
      newSelectedProduct = newSelectedProduct.concat(selectedProducts.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProduct = newSelectedProduct.concat(
        selectedProducts.slice(0, selectedIndex),
        selectedProducts.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedProducts: newSelectedProduct });

    onSelect(newSelectedProduct);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, products } = this.props;
    const { activeTab, selectedProducts, rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Checkbox
                      checked={selectedProducts.length === products.length}
                      color="primary"
                      indeterminate={
                        selectedProducts.length > 0 &&
                        selectedProducts.length < products.length
                      }
                      onChange={this.handleSelectAll}
                    />
                    Intitulé
                  </TableCell>
                  <TableCell align="left">Unité</TableCell>
                  <TableCell align="left">Prix</TableCell>
                  <TableCell align="left">Stock</TableCell>
                  <TableCell align="left">Fournisseur</TableCell>
                  <TableCell align="left">Info. Fournisseur</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .filter(product => {
                    if (activeTab === 1) {
                      return !product.returning;
                    }

                    if (activeTab === 2) {
                      return product.returning;
                    }

                    return product;
                  })
                  .slice(0, rowsPerPage)
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
                            checked={selectedProducts.indexOf(product.id) !== -1}
                            color="primary"
                            onChange={event =>
                              this.handleSelectOne(event, product.id)
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
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={products.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

ProductTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  products: PropTypes.array.isRequired
};

ProductTable.defaultProps = {
  products: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(ProductTable);
