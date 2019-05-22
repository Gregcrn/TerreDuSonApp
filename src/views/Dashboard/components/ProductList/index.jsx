import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Shared services
import { getCategory } from 'services/category';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Shared components
import Portlet from 'components/Portlet';
import PortletHeader from 'components/PortletHeader';
import PortletLabel from 'components/PortletLabel';
import PortletContent from 'components/PortletContent';
import PortletFooter from 'components/PortletFooter';

// Component styles
import styles from './styles';

class ProductList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 4,
    categories: [],
    categoriesTotal: 0,
    error: null
  };

  async getCategory() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state;

      const { categories, categoriesTotal } = await getCategory(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          categories,
          categoriesTotal
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

    this.getCategory();
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
        <Typography variant="h6">There are no categories available</Typography>
      );
    }

    return (
      <Fragment>
        {categories.map((category, i) => (
          <div
            className={classes.product}
            key={i}
          >
            <div className={classes.productImageWrapper}>
              <img
                alt="category Name"
                className={classes.productImage}
                src={category.imageUrl}
              />
            </div>
            <div className={classes.productDetails}>
              <Link to={`/categories/${category.id}`}>
                <Typography
                  className={classes.productTitle}
                  variant="h5"
                >
                  {category.title}
                </Typography>
              </Link>
              <Typography
                className={classes.productTimestamp}
                variant="body2"
              >
                Updated 5hr ago
              </Typography>
            </div>
            <div>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const { categoriesTotal } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${categoriesTotal} au total`}
            title="Dernières catégories"
          />
        </PortletHeader>
        <PortletContent className={classes.portletContent}>
          {this.renderCategories()}
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Link to = "/produits">
            <Button
              color="primary"
              size="small"
              variant="text"
            >
            Voir tout <ArrowRightIcon />
            </Button>
          </Link>
        </PortletFooter>
      </Portlet>
    );
  }
}

ProductList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductList);
