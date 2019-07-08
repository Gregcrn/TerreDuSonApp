import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import TextField from '@material-ui/core/TextField/index';
import Button from '@material-ui/core/Button';

// Shared components
import Portlet from 'components/Portlet';
import PortletHeader from 'components/PortletHeader';
import PortletLabel from 'components/PortletLabel';
import PortletContent from 'components/PortletContent';
import PortletFooter from 'components/PortletFooter';

// Component styles
import styles from './styles';

class Password extends Component {
  state = {
    values: {
      password: '',
      confirm: ''
    }
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { values } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            title="Mot de passe"
          />
        </PortletHeader>
        <PortletContent>
          <form className={classes.form}>
            <TextField
              className={classes.textField}
              label="Mot de passe"
              name="mot de passe"
              onChange={event =>
                this.handleFieldChange('password', event.target.value)
              }
              type="password"
              value={values.password}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Confimer mot de passe"
              name="confirm"
              onChange={event =>
                this.handleFieldChange('confirm', event.target.value)
              }
              type="password"
              value={values.confirm}
              variant="outlined"
            />
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="outlined"
          >
            Mettre à jour
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

Password.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Password);
