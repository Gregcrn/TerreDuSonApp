/* eslint-disable no-console */
import React, { Component } from 'react';

//axios
import axios from 'axios'

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
import {getUsers} from 'services/user/'

// Custom components
import UsersToolbar from './components/UsersToolbar';
import UsersTable from './components/UsersTable';

// Component styles
import styles from './style';

// Config Firebase
import config from '../../config/FirebaseConfig'
import { O2A } from 'object-to-array-convert';

class UserList extends Component {
  signal = true;
  state = {
    isLoading: true,
    limit: 100,
    users: [],
    selectedUsers: [],
    error: null,
  };

  // componentWillMount(){
  //   this.getUsers()
  // }

  // getUserData = () => {
  //   const ref = config.database().ref('users')
  //   ref.on('value', snapshot => {
  //     this.setState({
  //       users:  O2A(snapshot),
  //     })
  //   })
  // }

  async getUsers() {
    try {
      this.setState({ isLoading: false });
      const { limit } = this.state;
      const { users } = await getUsers(limit);
      // await this.getUserData();
      if (this.signal) {
        this.setState({
          isLoading: false,
          users
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
    this.getUsers();
    // this.setState({isLoading:true})
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, users, error } = this.state;

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

    if (users.length === 0) {
      // return <Typography variant="h6">Aucun utilisateur inscrit pour le moment </Typography>;
      return <div className={classes.progressWrapper}>
        <CircularProgress />
      </div>
    }

    return (
      <UsersTable
        onSelect={this.handleSelect}
        users={users}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedUsers } = this.state;
    return (
      <DashboardLayout title="Utilisateurs">
        <div className={classes.root}>
          <UsersToolbar selectedUsers={selectedUsers} />
          <div className={classes.content}>{this.renderUsers()}</div>
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