import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Typography from '@material-ui/core/Typography';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';

//service
import { getUsers } from 'services/user/index'

// Shared components
import Paper from 'components/Paper';

// Component styles
import styles from './styles';

class Users extends Component {
  state = {
    nbUsers: 0,
    error: null
  }

  async getUsers() {
    try {
      const { users } = await getUsers(10000);
      this.setState({
        nbUsers: users.length
      })
      
    } catch (error) {
      this.setState({
        error
      });
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    return (
      <Paper
        {...rest}
        className={rootClassName}
      >
        <div className={classes.content}>
          <Typography
            className={classes.title}
            variant="body2"
          >
            Nombre d'utilisateurs
          </Typography>
          <div className={classes.details}>
            <Typography variant="h3">{this.state.nbUsers}</Typography>
            <Typography
              className={classes.difference}
              variant="body2"
            >
              <ArrowDropUpIcon />
              100%
            </Typography>
          </div>
        </div>
        <div className={classes.iconWrapper}>
          <PeopleOutlinedIcon className={classes.icon} />
        </div>
      </Paper>
    );
  }
}

Users.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Users);
