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

// Custom components
import UsersToolbar from './components/UsersToolbar';
import UsersTable from './components/UsersTable';

// Component styles
import styles from './style';

// Config Firebase
import config from '../../config/FirebaseConfig'

class UserList extends Component {

  signal = true;
  state = {
    isLoading: true,
    limit: 100,
    users: [],
    selectedUsers: [],
    error: null,
  };

  componentWillMount(){
    this.getUsers()
  }
  getUserData = () => {
    setTimeout(() => {
      const ref = config.database().ref('utilisateurs')
      ref.on('value', snapshot => {
        this.setState({
          users: snapshot.val(),
        })
      })
    }, 700)
  }
  async getUsers() {
    try {
      this.setState({ isLoading: true });
      await this.getUserData();
      if (this.signal) {
        this.setState({
          isLoading: false,
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
    this.setState({isLoading:true})
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
      return <Typography variant="h6">There are no users</Typography>;
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