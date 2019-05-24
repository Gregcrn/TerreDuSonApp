import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
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
import SearchInput from 'components/SearchInput';

// Shared helpers
// import getInitials from 'helpers/getInitials';

// Shared components
import Portlet from 'components/Portlet';
import PortletContent from 'components/PortletContent';

// Component styles
import styles from './styles';

class UsersTable extends Component {
  state = {
    selectedUsers: [],
    rowsPerPage: 100,
    page: 0,
    search:''
  };

  handleSelectAll = event => {
    const { users, onSelect } = this.props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    this.setState({ selectedUsers });

    onSelect(selectedUsers);
  };

  handleSelectOne = (event, id) => {
    const { onSelect } = this.props;
    const { selectedUsers } = this.state;

    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedUsers: newSelectedUsers });

    onSelect(newSelectedUsers);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  
  updateSearch(event){
    this.setState({search: event.target.value.substr(0, 20)})
  }

  render() {
    const { classes, className, users } = this.props;
    const { activeTab, selectedUsers, rowsPerPage, page } = this.state;

    const filteredUser  = this.props.users.filter(
      (user) => {
        return (user.nom.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 )|| user.role.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
    )

    const rootClassName = classNames(classes.root, className);

    return (
      <div>
        <div className={classes.margin}>
          <SearchInput
            className={classes.searchInput}
            onChange={this.updateSearch.bind(this)}
            placeholder="Rechercher par nom ou rôle"
            value={this.state.search}
          />
        </div>
        <Portlet className={rootClassName}>
          <PortletContent noPadding>
            <PerfectScrollbar>
            
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Checkbox
                        checked={selectedUsers.length === users.length}
                        color="primary"
                        indeterminate={
                          selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                        }
                        onChange={this.handleSelectAll}
                      />
                    Nom
                    </TableCell>
                    <TableCell align="left">Rôle</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Date d'ajout</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUser
                    .filter(user => {
                      if (activeTab === 1) {
                        return !user.returning;
                      }

                      if (activeTab === 2) {
                        return user.returning;
                      }

                      return user;
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(user => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={user.id}
                        selected={selectedUsers.indexOf(user.id) !== -1}
                      >
                        <TableCell className={classes.tableCell}>
                          <div className={classes.tableCellInner}>
                            <Checkbox
                              checked={selectedUsers.indexOf(user.id) !== -1}
                              color="primary"
                              onChange={event =>
                                this.handleSelectOne(event, user.id)
                              }
                              value="true"
                            />
                            {/* <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          >
                            {getInitials(user.name)}
                          </Avatar> */}
                            <Link to="#">
                              <Typography
                                className={classes.nameText}
                                variant="body1"
                              >
                                {user.nom}
                              </Typography>
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {user.role}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {user.email}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {moment(user.date).format('DD/MM/YYYY')}
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
              count={users.length}
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
      </div>
    );
  }
}

UsersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  users: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  users: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(UsersTable);
